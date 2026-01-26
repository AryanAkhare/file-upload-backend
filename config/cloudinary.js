const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    console.log("Cloudinary connected.");
  } catch (error) {
    console.error("Cloudinary connection failed:", error.message);
  }
};

module.exports = cloudinary; //exports the configured cloudinary instance
module.exports.cloudinaryConnect = cloudinaryConnect; //exports the connection function
