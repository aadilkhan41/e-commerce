const express = require("express");
const controllers = require("../controllers/product.controller");
const authorizer = require("../middlewares/rbac");

const router = express.Router();
router.post("/create", authorizer(["SELLER"]), controllers.createProduct);
router.get("/list", controllers.listProducts);
router.post("/delete", controllers.deleteProduct);
router.post("/update/:id", controllers.updateProduct);

module.exports = router;