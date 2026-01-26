/**
 * Video Upload Controller
 * Handles uploading videos to Cloudinary
 */

const File = require("../models/File");
const cloudinary = require("../config/cloudinary");

/**
 * Uploads video file to Cloudinary
 * @param {Object} file - File object from request
 * @param {String} folder - Cloudinary folder name
 * @returns {Object} Cloudinary response
 */
async function uploadFileToCloudinary(file, folder) {
    const options = {
        folder,
        use_filename: true,
        unique_filename: false,
        resource_type: "video"
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

/**
 * Video upload handler
 * Validates video type, uploads to Cloudinary, saves to database
 */
exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;

        // Validate file exists
        if (!req.files || !req.files.video) {
            return res.status(400).json({
                success: false,
                message: "No video file uploaded"
            });
        }

        const file = req.files.video;

        // Validate file type
        const supportedTypes = ['mp4', 'avi', 'mov', 'mkv'];
        const fileType = file.name.split('.').pop().toLowerCase();

        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: 'File type not supported. Allowed: mp4, avi, mov, mkv'
            });
        }

        // Upload to Cloudinary
        const response = await uploadFileToCloudinary(file, 'Codehelp');

        if (!response || !response.secure_url) {
            return res.status(500).json({
                success: false,
                message: 'Failed to upload video to Cloudinary'
            });
        }

        // Save to database
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url
        });

        return res.status(201).json({
            success: true,
            message: 'Video uploaded successfully',
            videoUrl: response.secure_url,
            fileId: fileData._id
        });

    } catch (error) {
        console.error('Video upload error:', error);
        return res.status(500).json({
            success: false,
            message: 'Video upload failed'
        });
    }
};
