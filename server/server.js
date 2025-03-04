const express = require("express");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopPrescriptionRouter = require("./routes/shop/prescription-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

// SSL configuration: adjust the file paths as needed or use environment variables.
const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH || "localhost.key"  ),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH || "localhost.crt"),
};

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "http://13.202.214.198:5173");
  res.header("Access-Control-Allow-Origin", `${process.env.VITE_API_URL}`);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const corsOptions = {
  origin: `${process.env.VITE_API_URL}`,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight response for all routes

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/prescription", shopPrescriptionRouter);

app.use("/api/common/feature", commonFeatureRouter);

// Create an HTTPS server using the SSL options
https.createServer(sslOptions, app).listen(PORT, "0.0.0.0", () => {
  console.log(`Server is now running securely on port ${PORT}`);
});
