const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true,
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "products",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const ReviewModel = mongoose.model("blog", reviewSchema);
module.exports = ReviewModel;