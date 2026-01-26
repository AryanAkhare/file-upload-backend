/**
 * Local File Upload Controller
 * Handles uploading files to local server storage
 */

exports.localFileUpload = async (req, res) => {
    try {
        // Extract file from request
        const file = req.files.file;
        console.log('File received:', file);

        // Generate file path with timestamp
        const filePath = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        // Move file to destination
        file.mv(filePath, (err) => {
            if (err) {
                console.error('File move error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error moving file'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Local file uploaded successfully',
                filePath: filePath
            });
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Local file upload failed'
        });
    }
};
