const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!lastName || !firstName || !email || !password) {
      throw new Error("Please fill in all fields");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    if (!user) throw new Error("User not created");

    await user.save();

    res.json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please fill in all fields");
    }

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found with these credentials" });

    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (isPasswordSame) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_STRING, {
        expiresIn: "1d",
      });

      res.cookie("token", token);

      res.json({ message: "user logged in successfully", user });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRouter;
