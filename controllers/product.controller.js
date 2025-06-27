const ProductModel = require("../models/product.model");

const createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            discountPercentage = 0,
            rating = -1,
            stock,
            brand,
            category,
            thumbnail,
            images = [],
        } = req.body;
        if (
            !title ||
            !description ||
            price == null ||
            stock == null ||
            !brand ||
            !category ||
            !thumbnail
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        if (price < 0 || price > 9999) {
            return res.status(400).json({
                success: false,
                message: "Price must be between 0 and 9999",
            });
        }

        if (stock < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock must be 0 or more",
            });
        }

        const product = await ProductModel.create({
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            productId: product._id,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while creating product",
        });
    }
};

const listProducts = async (req, res) => {
    try {
        const searchKey = req.query.searchKey?.trim() || "";
        const pageNo = parseInt(req.query.pageNo) || 1;
        const pageSize = 5;

        if (pageNo <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid page number. Must be >= 1.",
            });
        }

        const findQuery = {
            $or: [
                { title: { $regex: searchKey, $options: "i" } },
                { description: { $regex: searchKey, $options: "i" } },
            ],
        };

        const totalItems = await ProductModel.countDocuments(findQuery);

        const products = await ProductModel.find(findQuery)
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize);

        return res.json({
            success: true,
            message: "Products List API",
            totalItems,
            currentPage: pageNo,
            pageSize,
            totalPages: Math.ceil(totalItems / pageSize),
            results: products,
        });
    } catch (error) {
        console.error("Error listing products:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while listing products.",
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.json({
            success: true,
            message: "Product deleted successfully",
            deletedId: deletedProduct._id,
        });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while deleting product",
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while updating product",
        });
    }
};

const productController = { createProduct, listProducts, deleteProduct, updateProduct };
module.exports = productController;
