const express = require("express");
const imagekitRouter = express.Router();
const Imagekit = require("imagekit");

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

imagekitRouter.get("/imagekit-auth", (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).send({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = imagekitRouter;
