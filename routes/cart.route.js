const express = require("express");
const controllers = require("../controllers/cart.controller");

const router = express.Router();
router.post("/cud", controllers.cudToCart);
router.get("/list", controllers.getCart);

module.exports = router;