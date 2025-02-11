require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/database");

app.use(cors());

app.use(express.json());

const userRouter = require("./router/user");
const productsRouter = require("./router/products");

app.use("/", userRouter);
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
