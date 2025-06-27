const express = require("express");
const controllers = require("../controllers/wishlist.controller");

const router = express.Router();
router.post("/add", controllers.addToWishlist);
router.get("/list", controllers.getWishlist);
router.post("/remove/:productId", controllers.removeFromWishlist);
router.post("/clear", controllers.clearWishlist);

module.exports = router;