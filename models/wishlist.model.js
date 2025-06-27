const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true,
        },
        products: [
            {
                type: mongoose.Types.ObjectId,
                ref: "products",
            }
        ],
    },
    {
        timestamps: true,
    }
);

const WishlistModel = mongoose.model("wishlists", wishlistSchema);
module.exports = WishlistModel;