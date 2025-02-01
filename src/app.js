require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/database");

const productsRouter = require("./router/products");

app.use(cors());

app.use(express.json());

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
