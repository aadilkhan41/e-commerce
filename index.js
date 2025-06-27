const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middlewares/auth");
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const couponRoutes = require("./routes/coupon.route");
const orderRoutes = require("./routes/order.route");
const wishlistRoutes = require("./routes/wishlist.route");
const blogRoutes = require("./routes/blog.route");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log(`DB Connected successfully`))
    .catch(err => console.log(`DB Connection Error, ${err}`))

app.use("/api/v1/user", userRoutes);
app.use(authMiddleware);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/blog", blogRoutes);

const portNo = process.env.PORT || 8080;
app.listen(portNo, () => console.log(`Server is up at port ${portNo}`));