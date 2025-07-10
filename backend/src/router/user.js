const express = require("express");
const { userAuth } = require("../middleware/userAuth");

const userRouter = express.Router();

userRouter.get("/user", userAuth, async (req, res) => {
  try {
    const { user } = req;

    if (!user) res.status(404).json({ message: "User not found!" });

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.put("/user", userAuth, async (req, res) => {
  try {
    const { user } = req;

    Object.keys(req.body).forEach((item) => (user[item] = req.body[item]));
    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
