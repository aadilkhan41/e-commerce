const CartModel = require("../models/cart.model");

const cudToCart = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        if (!productId || typeof qty !== "number") {
            return res.status(400).json({
                success: false,
                message: "Invalid productId or qty",
            });
        }

        const userId = req.user._id;
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            if (qty <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot add product with qty 0 to a new cart",
                });
            }

            cart = await CartModel.create({
                userId,
                products: [{ productId, qty }],
            });
        } else {
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId
            );

            if (productIndex > -1) {
                if (qty === 0) {
                    cart.products.splice(productIndex, 1);
                } else {
                    cart.products[productIndex].qty = qty;
                }
            } else {
                if (qty > 0) {
                    cart.products.push({ productId, qty });
                }
            }

            if (cart.products.length === 0) {
                await CartModel.deleteOne({ _id: cart._id });
                return res.json({
                    success: true,
                    message: "Product removed. Cart is now empty and deleted.",
                });
            } else {
                await cart.save();
            }
        }

        return res.json({
            success: true,
            message:
                qty === 0
                    ? "Product removed from cart"
                    : "Cart updated successfully",
        });
    } catch (error) {
        console.error("Cart update error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while updating cart",
        });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.user._id }).populate(
            "products.productId"
        );

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
                data: null,
            });
        }

        res.json({
            success: true,
            message: "User cart API",
            data: cart,
        });
    } catch (error) {
        console.error("Error fetching cart:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while fetching cart",
        });
    }
};

const cartController = { cudToCart, getCart };
module.exports = cartController;
