const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        products: {
            type: [
                {
                    productId: {
                        type: mongoose.Types.ObjectId,
                        ref: "products",
                        required: true,
                    },
                    qty: {
                        type: Number,
                        required: true,
                        min: 1,
                    },
                },
            ],
            required: true,
        },
        coupon: {
            type: String,
            required: false,
            default: "",
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        modeOfPayment: {
            type: String,
            required: true,
            enum: ["ONLINE", "COD"],
        },
        orderTotal: {
            type: Number,
            required: true,
            min: 0,
        },
        orderStatus: {
            type: String,
            required: true,
            enum: [
                "IN_PROGRESS",
                "PAYMENT_PENDING",
                "PAYMENT_SUCCESS",
                "IN_TRANSIT",
                "OUT_FOR_DELIVERY",
                "DELIVERY",
                "RETURNED",
                "EXCHANGED",
            ],
        },
        deliveryAddress: {
            addressLine1: {
                type: String,
                required: true,
            },
            addressLine2: {
                type: String,
                required: false,
                default: "",
            },
            landmark: {
                type: String,
                required: false,
                default: "",
            },
            city: {
                type: String,
                requried: true,
            },
            state: {
                type: String,
                requried: true,
            },
            pincode: {
                type: String,
                requried: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const OrderModel = mongoose.model("orders", orderSchema);
module.exports = OrderModel;