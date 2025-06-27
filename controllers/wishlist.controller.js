const WishlistModel = require("../models/wishlist.model");

const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        let wishlist = await WishlistModel.findOne({ userId });

        if (!wishlist) {
            wishlist = await WishlistModel.create({
                userId,
                products: [productId],
            });
        } else {
            if (wishlist.products.includes(productId)) {
                return res
                    .status(409)
                    .json({
                        success: false,
                        message: "Product already in wishlist",
                    });
            }
            wishlist.products.push(productId);
            await wishlist.save();
        }

        res.json({
            success: true,
            message: "Product added to wishlist",
            data: wishlist,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getWishlist = async (req, res) => {
    try {
        const wishlist = await WishlistModel.findOne({
            userId: req.user._id,
        }).populate("products");
        res.json({ success: true, data: wishlist || { products: [] } });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const wishlist = await WishlistModel.findOne({ userId: req.user._id });

        if (!wishlist || !wishlist.products.includes(productId)) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Product not found in wishlist",
                });
        }

        wishlist.products = wishlist.products.filter(
            (p) => p.toString() !== productId
        );
        await wishlist.save();

        res.json({
            success: true,
            message: "Product removed from wishlist",
            data: wishlist,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const clearWishlist = async (req, res) => {
    try {
        await WishlistModel.findOneAndDelete({ userId: req.user._id });
        res.json({ success: true, message: "Wishlist cleared" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist, clearWishlist };