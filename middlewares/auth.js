const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/user.model");

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")?.[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized 1",
        });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await UserModel.findById(data.id);
        req.user = user;
        if (user.jwt !== token) {
            throw new Error("Unauthorized");
        }
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized 2",
        });
    }
};

module.exports = authMiddleware;