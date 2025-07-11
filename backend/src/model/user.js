const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLenght: 3,
      maxLenght: 50,
      trim: true,
    },
    lastName: {
      type: String,
      minLenght: 3,
      maxLenght: 50,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^@]+@[^@]+\.[^@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      required: [true, "User phone number required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
      validate: {
        validator: function (val) {
          return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(val);
        },
        message: () => "Mobile number is not valid",
      },
    },
    password: { type: String, required: [true, "User password is required"] },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
