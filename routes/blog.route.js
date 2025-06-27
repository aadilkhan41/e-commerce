const express = require("express");
const controller = require("../controllers/blog.controller");

const router = express.Router();
router.post("/create-update", controller.upsertReview);
router.get("/list/:productId", controller.getProductReviews);
router.post("/delete/:id", controller.deleteReview);

module.exports = router;