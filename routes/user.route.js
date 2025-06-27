const express = require("express");
const controllers = require("../controllers/user.controller");

const router = express.Router();
router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.post("/logout", controllers.logout);
router.post("/forgot-password", controllers.forgotPassword);
router.post("/reset-password", controllers.resetPassword);
router.post("/change-password", controllers.changePassword);

module.exports = router;