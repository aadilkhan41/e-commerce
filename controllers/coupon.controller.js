const CouponModel = require("../models/coupon.model");

const createCoupon = async (req, res) => {
    try {
        const {
            code,
            startDate,
            endDate,
            discountPercentage,
            minOrderValue,
            maxDiscountValue,
        } = req.body;

        if (
            !code ||
            !startDate ||
            !endDate ||
            discountPercentage == null ||
            minOrderValue == null ||
            maxDiscountValue == null
        ) {
            return res.status(400).json({
                success: false,
                message: "All coupon fields are required",
            });
        }

        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({
                success: false,
                message: "Start date must be before end date",
            });
        }

        const existing = await CouponModel.findOne({ code });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Coupon code already exists",
            });
        }

        await CouponModel.create({
            code,
            startDate,
            endDate,
            discountPercentage,
            minOrderValue,
            maxDiscountValue,
        });

        return res.status(201).json({
            success: true,
            message: "Coupon created successfully",
        });
    } catch (error) {
        console.error("Error creating coupon:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while creating coupon",
        });
    }
};

const updateCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const {
            code,
            startDate,
            endDate,
            discountPercentage,
            minOrderValue,
            maxDiscountValue,
        } = req.body;

        if (
            !code ||
            !startDate ||
            !endDate ||
            discountPercentage == null ||
            minOrderValue == null ||
            maxDiscountValue == null
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({
                success: false,
                message: "Start date must be before end date",
            });
        }

        const updated = await CouponModel.findByIdAndUpdate(
            couponId,
            {
                code,
                startDate,
                endDate,
                discountPercentage,
                minOrderValue,
                maxDiscountValue,
            },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }

        res.json({
            success: true,
            message: "Coupon updated successfully",
            data: updated,
        });
    } catch (error) {
        console.error("Update coupon error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while updating coupon",
        });
    }
};

const listCoupons = async (req, res) => {
    try {
        const coupons = await CouponModel.find().sort({ startDate: -1 });

        res.json({
            success: true,
            message: "Coupon list",
            data: coupons,
        });
    } catch (error) {
        console.error("Error fetching coupons:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while fetching coupons",
        });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;

        const deleted = await CouponModel.findByIdAndDelete(couponId);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }

        res.json({
            success: true,
            message: "Coupon deleted successfully",
            deletedId: deleted._id,
        });
    } catch (error) {
        console.error("Error deleting coupon:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while deleting coupon",
        });
    }
};

const couponController = { createCoupon, updateCoupon, listCoupons, deleteCoupon };
module.exports = couponController;
