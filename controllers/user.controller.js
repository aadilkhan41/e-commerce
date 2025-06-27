const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const dayjs = require("dayjs");

dotenv.config();

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, mobNo, password, address } =
            req.body;
        if (!firstName || !lastName || !email || !mobNo || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields.",
            });
        }

        if (
            !address ||
            !address.addressLine1 ||
            !address.city ||
            !address.state ||
            !address.pincode
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing address fields.",
            });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already registered with this email.",
            });
        }

        await UserModel.create({
            ...req.body,
            role: "CUSTOMER",
        });

        res.status(201).json({
            success: true,
            message: "Registered successfully!",
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not registered, please create an account first.",
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password.",
            });
        }

        const jwtData = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, {
            expiresIn: "10h",
        });

        await UserModel.findByIdAndUpdate(user._id, {
            $set: { jwt: token },
        });

        res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong during login.",
        });
    }
};

const logout = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required to logout.",
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        await UserModel.findByIdAndUpdate(user._id, {
            $set: { jwt: "" },
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully.",
        });
    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not registered.",
            });
        }

        const otp = String(Math.floor(1000 + Math.random() * 9000));
        const otpExpiresAt = dayjs().add(5, "minute").toDate();

        await UserModel.findByIdAndUpdate(user._id, {
            $set: {
                passwordOtp: otp,
                otpExpiresAt,
            },
        });

        // TODO: Integrate email service to send the OTP
        console.log(`OTP for ${email}: ${otp}`);

        res.status(200).json({
            success: true,
            message: "OTP sent to your registered email.",
        });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email, OTP, and new password are required.",
            });
        }

        const user = await UserModel.findOne({ email, passwordOtp: otp });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or OTP.",
            });
        }

        const currentTime = dayjs();
        const otpExpiry = dayjs(user.otpExpiresAt);
        if (currentTime.isAfter(otpExpiry)) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new one.",
            });
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the old password.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await UserModel.findByIdAndUpdate(user._id, {
            $set: {
                password: hashedPassword,
                passwordOtp: "",
                otpExpiresAt: null,
            },
        });

        res.status(200).json({
            success: true,
            message: "Password reset successfully.",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again.",
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email, old password, and new password are required.",
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect.",
            });
        }

        const isSame = await bcrypt.compare(newPassword, user.password);
        if (isSame) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the old password.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const jwtData = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
        });

        await UserModel.findByIdAndUpdate(user._id, {
            $set: {
                password: hashedPassword,
                jwt: token,
            },
        });

        res.status(200).json({
            success: true,
            message: "Password changed successfully.",
            token,
        });
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    }
};

const userController = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
};
module.exports = userController;