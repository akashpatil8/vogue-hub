const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }

    const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET_STRING);

    const user = await User.findById(decodedTokenData.id);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userAuth };
