const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const emailTemplate = `<div
      style="
        background: #f8fafc;
        padding: 32px 0;
        font-family: 'Segoe UI', Arial, sans-serif;
      "
    >
      <div
        style="
          max-width: 600px;
          margin: auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 12px #0001;
          overflow: hidden;
        "
      >
        <div style="background: #1e293b; padding: 24px 0; text-align: center">
          <img
            src="https://ik.imagekit.io/akashpatil8/Voguehub/logo-light.png?updatedAt=1751910271481"
            alt="VogueHub Logo"
            style="height: 48px; margin-bottom: 8px"
          />
          <h1
            style="
              color: #fff;
              font-size: 1.6rem;
              margin: 0;
              letter-spacing: 2px;
            "
          >
            Reset your password
          </h1>
        </div>
        <div style="padding: 32px 24px">
          <h2
            style="
              color: #1e293b;
              margin-top: 0;
              margin-bottom: 16px;
              font-size: 1.25rem;
            "
          >
            Hi {{firstName}},
          </h2>
          <p style="color: #334155; font-size: 1rem; margin-bottom: 24px">
            We received a request to reset the password for your
            <strong>VogueHub</strong>
            account. If you made this request, please click the button below to
            set a new password.
          </p>
          <div style="text-align: center; margin-bottom: 32px">
            <a
              href="{{resetLink}}"
              style="
                display: inline-block;
                background: #1e293b;
                color: #fff;
                padding: 14px 32px;
                border-radius: 6px;
                font-weight: 600;
                text-decoration: none;
                font-size: 1rem;
                box-shadow: 0 2px 8px #1e293b22;
                letter-spacing: 1px;
              "
            >
              Reset Password
            </a>
          </div>
          <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 0">
            If you didn’t request this, you can safely ignore this email.<br />
            <span style="color: #1e293b; font-weight: 500"
              >– Team VogueHub</span
            >
          </p>
        </div>
        <div
          style="
            background: #f1f5f9;
            padding: 16px 24px;
            text-align: center;
            font-size: 0.9rem;
            color: #94a3b8;
          "
        >
          &copy; VogueHub 2025
        </div>
      </div>
    </div>`;

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password) {
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_STRING, {
      expiresIn: "1d",
    });
    res.cookie("token", token);

    await user.save();

    res.json({ message: "User created successfully", user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        success: false,
        message:
          "Email is already resgistered. Please login or reset the password",
      });
    }
    res.status(500).json({ message: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
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
      const token = generateJWT(user._id);

      res.cookie("token", token);

      res.json({ message: "user logged in successfully", user });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.json({ message: "User logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.post("/forget-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Please enter the registered email" });
    }

    const token = generateJWT(user._id, "15min");

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    const template = emailTemplate
      .replace("{{firstName}}", user.firstName)
      .replace("{{resetLink}}", resetLink);

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `VogueHub ${process.env.EMAIL}`,
        to: user.email,
        subject: "VogueHub – Password Reset Request",
        html: template,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: "Email sending failed" });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent to your mail address",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

authRouter.post("/reset-password", async (req, res) => {
  try {
    const { password, token } = req.body;
    if (!password || !token) {
      return res
        .status(400)
        .json({ success: false, message: "Password and token are required" });
    }

    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    let user = await User.findById(decodedToken.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = authRouter;

const generateJWT = (userId, expiresIn = "365d") => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_STRING, {
    expiresIn: expiresIn,
  });
};
