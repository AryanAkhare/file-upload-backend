const File = require("../models/File");
const cloudinary = require("../config/cloudinary");

/**
 * Universal image upload + reducer
 * Supports:
 * 1. Quality reduction
 * 2. Width / Height reduction
 * 3. Both together
 */
async function uploadAndReduceImage(file, folder, options = {}) {
    const uploadOptions = {
        folder,
        resource_type: "image",
        use_filename: true,
        unique_filename: false
    };

    // 🔹 Reduce by quality
    if (options.quality) {
        uploadOptions.quality = options.quality; // e.g. "auto:low", 60
    }

    // 🔹 Reduce by dimensions
    if (options.width || options.height) {
        uploadOptions.transformation = [{
            width: options.width,
            height: options.height,
            crop: "limit" // prevents upscaling
        }];
    }

    return await cloudinary.uploader.upload(
        file.tempFilePath,
        uploadOptions
    );
}

/**
 * Image Upload with Size Reduction
 */
exports.imageSizeReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body;

        // 🔒 Validate file exists
        if (!req.files || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded"
            });
        }

        const file = req.files.image;

        // 🔒 Validate file type
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported (jpg, jpeg, png only)"
            });
        }

        // 🚀 Upload + reduce (CHANGE OPTIONS HERE)
        const response = await uploadAndReduceImage(file, "Codehelp", {
            quality: "auto:low", // optional
            width: 800,           // optional
            height: 800           // optional
        });

        if (!response?.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload failed"
            });
        }

        // 💾 Save to DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        return res.status(201).json({
            success: true,
            message: "Image uploaded and size reduced successfully",
            data: fileData
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Image Size Reduction Failed"
        });
    }
};
