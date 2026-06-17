const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const adminAuthRoutes = require(
  "./src/routes/adminAuthRoutes"
);

const errorHandler = require(
  "./src/middleware/errorMiddleware"
);

const categoryRoutes = require(
  "./src/routes/categoryRoutes"
);

const mediaRoutes = require(
  "./src/routes/mediaRoutes"
);

const productRoutes = require(
  "./src/routes/productRoutes"
);

const settingRoutes = require(
  "./src/routes/settingRoutes"
);

const bannerRoutes = require(
  "./src/routes/bannerRoutes"
);

const userRoutes =
require(
 "./src/routes/userRoutes"
);

const wishlistRoutes =
require(
"./src/routes/wishlistRoutes"
);

const cartRoutes =
require(
"./src/routes/cartRoutes"
);

const reviewRoutes =
require(
"./src/routes/reviewRoutes"
);

const orderRoutes =
require(
"./src/routes/orderRoutes"
);

const dashboardRoutes =
require(
"./src/routes/dashboardRoutes"
);

const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL
    ],
    credentials: true
  })
);

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  "/api/admin/auth",
  adminAuthRoutes
);
app.use(errorHandler);
app.use(
  "/api/categories",
  categoryRoutes
);
app.use(
  "/api/media",
  mediaRoutes
);
app.use(
  "/api/products",
  productRoutes
);
app.use(
  "/api/settings",
  settingRoutes
);
app.use(
  "/api/banners",
  bannerRoutes
);

app.use(
 "/api/users",
 userRoutes
);
app.use(
"/api/wishlist",
wishlistRoutes
);

app.use(
"/api/cart",
cartRoutes
);

app.use(
"/api/reviews",
reviewRoutes
);

app.use(
"/api/orders",
orderRoutes
);

app.use(
"/api/dashboard",
dashboardRoutes
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Premium Footwear API Running"
  });
});

module.exports = app;