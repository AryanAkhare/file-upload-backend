/**
 * Image Upload Controller
 * Handles uploading images to Cloudinary
 */

const File = require("../models/File");
const cloudinary = require("../config/cloudinary");

/**
 * Uploads image file to Cloudinary
 * @param {Object} file - File object from request
 * @param {String} folder - Cloudinary folder name
 * @returns {Object} Cloudinary response
 */
async function uploadFileToCloudinary(file, folder) {
    const options = {
        folder,
        use_filename: true,
        unique_filename: false,
        resource_type: "image"
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

/**
 * Image upload handler
 * Validates image type, uploads to Cloudinary, saves to database
 */
exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;

        // Validate file exists
        if (!req.files || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded"
            });
        }

        const file = req.files.image;

        // Validate file type
        const supportedTypes = ['jpg', 'png', 'jpeg'];
        const fileType = file.name.split('.').pop().toLowerCase();

        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: 'File type not supported. Allowed: jpg, png, jpeg'
            });
        }

        // Upload to Cloudinary
        const response = await uploadFileToCloudinary(file, 'Codehelp');

        if (!response || !response.secure_url) {
            return res.status(500).json({
                success: false,
                message: 'Failed to upload image to Cloudinary'
            });
        }

        // Save to database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        return res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrl: response.secure_url,
            fileId: fileData._id
        });

    } catch (error) {
        console.error('Image upload error:', error);
        return res.status(500).json({
            success: false,
            message: 'Image upload failed'
        });
    }
};
