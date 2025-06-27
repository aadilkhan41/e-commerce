const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
    {
        products: {
            type: [{
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
            }],
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CartModel = mongoose.model("carts", cartSchema);
module.exports = CartModel;