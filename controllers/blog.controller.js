const ReviewModel = require("../models/blog.model");

const upsertReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user._id;

        const existing = await ReviewModel.findOne({ userId, productId });

        if (existing) {
            existing.rating = rating;
            existing.comment = comment;
            await existing.save();
            return res.json({
                success: true,
                message: "Review updated",
                data: existing,
            });
        }

        const review = await ReviewModel.create({
            userId,
            productId,
            rating,
            comment,
        });
        res.json({ success: true, message: "Review added", data: review });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error saving review",
        });
    }
};

const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await ReviewModel.find({ productId }).populate(
            "userId",
            "name"
        );
        res.json({ success: true, data: reviews });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching reviews",
        });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user._id;

        const review = await ReviewModel.findOne({ _id: reviewId, userId });

        if (!review) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Review not found or not yours",
                });
        }

        await ReviewModel.findByIdAndDelete(reviewId);

        res.json({ success: true, message: "Review deleted" });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting review",
        });
    }
};

module.exports = { upsertReview, getProductReviews, deleteReview };