const express = require("express");
const controllers = require("../controllers/coupon.controller");
const authorizer = require("../middlewares/rbac");

const router = express.Router();
router.post("/create", authorizer(["SELLER", "ADMIN"]), controllers.createCoupon);
router.post("/update/:id", authorizer(["SELLER", "ADMIN"]), controllers.updateCoupon);
router.get("/list", controllers.listCoupons);
router.post("/delete/:id", authorizer(["SELLER", "ADMIN"]), controllers.deleteCoupon);

module.exports = router;