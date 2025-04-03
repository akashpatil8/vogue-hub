require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, "dist")));
app.use("/uploads", express.static("uploads"));

const cartRouter = require("./router/cart");
const authRouter = require("./router/auth");
const productsRouter = require("./router/products");
const wishlistRouter = require("./router/wishlist");
const userRouter = require("./router/user");
const orderRouter = require("./router/order");

app.use("/api", authRouter);
app.use("/api", cartRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", productsRouter);
app.use("/api", wishlistRouter);

// Catch-all route to serve `index.html`
app.get("/", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.sendFile(path.join(__dirname, "dist", "index.html"), {
    cacheControl: false,
  });
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connection to the database was successful");
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
