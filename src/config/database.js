const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose.connect(process.env.DB_CONNECTION_STRING);
};

module.exports = connectDB;
