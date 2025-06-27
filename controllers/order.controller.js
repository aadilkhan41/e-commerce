const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
const CartModel = require("../models/cart.model");
const CouponModel = require("../models/coupon.model");
const ProductModel = require("../models/product.model");
const OrderModel = require("../models/order.model");

dayjs.extend(isBetween);

const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        // Step 1: Get Cart
        const userCart = await CartModel.findOne(
            { userId },
            { products: 1 }
        ).populate("products.productId");

        if (!userCart || userCart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "Cart is empty, please add products to cart before placing an order",
            });
        }

        // Step 2: Check stock availability
        const productsAvailable = userCart.products.every(
            (p) => p.productId && p.productId.stock >= p.qty
        );

        if (!productsAvailable) {
            return res.status(400).json({
                success: false,
                message: "One or more items are out of stock",
            });
        }

        // Step 3: Calculate total
        const total = userCart.products.reduce((acc, p) => {
            return acc + p.productId.price * p.qty;
        }, 0);

        let finalDiscount = 0;

        // Step 4: Apply coupon if exists
        if (req.body.coupon) {
            const coupon = await CouponModel.findOne({ code: req.body.coupon });

            if (!coupon) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid coupon code",
                });
            }

            if (total < coupon.minOrderValue) {
                return res.status(400).json({
                    success: false,
                    message: `Minimum order value for this coupon is ₹${coupon.minOrderValue}`,
                });
            }

            const now = dayjs();
            const start = dayjs(coupon.startDate);
            const end = dayjs(coupon.endDate);

            if (!now.isAfter(start) || !now.isBefore(end)) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon is expired or not yet valid",
                });
            }

            const discountAmount = (total * coupon.discountPercentage) / 100;
            finalDiscount = Math.min(discountAmount, coupon.maxDiscountValue);
        }

        const grandTotal = total - finalDiscount;

        // Step 5: Deduct stock for each product
        for (let item of userCart.products) {
            await ProductModel.findByIdAndUpdate(item.productId._id, {
                $inc: { stock: -item.qty },
            });
        }

        // Step 6: Check delivery address
        if (
            !req.user.address ||
            !req.user.address.addressLine1 ||
            !req.user.address.city ||
            !req.user.address.state ||
            !req.user.address.pincode
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Incomplete delivery address. Please update your profile.",
            });
        }

        // Step 7: Create order
        await OrderModel.create({
            products: userCart.products.map((p) => ({
                productId: p.productId._id,
                qty: p.qty,
            })),
            coupon: req.body.coupon || "",
            user: userId,
            modeOfPayment: req.body.paymentMode,
            orderTotal: grandTotal,
            orderStatus:
                req.body.paymentMode === "ONLINE"
                    ? "PAYMENT_PENDING"
                    : "IN_TRANSIT",
            deliveryAddress: req.user.address,
        });

        // Step 8: Clear cart
        await CartModel.findByIdAndDelete(userCart._id);

        return res.json({
            success: true,
            message: "Order placed successfully",
        });
    } catch (error) {
        console.error("Order error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to place order. Server error.",
        });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await OrderModel.findOne({
            _id: orderId,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found or unauthorized",
            });
        }

        const nonCancellableStatuses = ["DELIVERY", "RETURNED", "EXCHANGED"];
        if (nonCancellableStatuses.includes(order.orderStatus)) {
            return res.status(400).json({
                success: false,
                message: `Order cannot be cancelled once it is marked as ${order.orderStatus}`,
            });
        }

        for (const item of order.products) {
            await ProductModel.findByIdAndUpdate(item.productId, {
                $inc: { stock: item.qty },
            });
        }

        order.orderStatus = "RETURNED";
        await order.save();

        res.json({
            success: true,
            message: "Order cancelled and stock restored",
        });
    } catch (error) {
        console.error("Cancel order error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to cancel order",
        });
    }
};

const orderController = { createOrder, cancelOrder };
module.exports = orderController;