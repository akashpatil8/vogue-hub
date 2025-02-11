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
      required: [true, "Last name is required"],
      minLenght: 3,
      maxLenght: 50,
      trim: true,
    },
    email: {
      type: String,
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
    password: { type: String, required: [true, "User password is required"] },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    bag: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
