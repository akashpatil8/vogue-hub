require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(cors());

app.use(express.json());
app.use(cookieParser());

const productsRouter = require("./router/products");
const authRouter = require("./router/auth");

app.use("/", authRouter);
app.use("/", productsRouter);

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
