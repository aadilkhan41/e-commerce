const express = require("express");
const controllers = require("../controllers/order.controller");

const router = express.Router();
router.post("/place-order", controllers.createOrder);
router.post("/cancel-order/:id", controllers.cancelOrder);

module.exports = router;