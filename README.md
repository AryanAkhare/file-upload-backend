# File Upload Application

A backend API for uploading images and videos with cloud storage integration, database management, and email notifications.

## Overview

This Node.js backend application provides a complete file upload solution with support for images and videos. It stores media files in the cloud using Cloudinary, saves metadata to MongoDB, and sends email notifications to users upon successful uploads.

## Features

- Image and video upload functionality
- Cloud storage integration with Cloudinary
- Local file storage option
- MongoDB database for file metadata
- Email notifications via Nodemailer
- User authentication with JWT
- Password encryption with bcrypt
- CORS support for cross-origin requests
- File upload middleware with express-fileupload

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Cloud Storage:** Cloudinary
- **Email Service:** Nodemailer
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcrypt
- **Development Tool:** Nodemon

## Project Structure

```
file-upload-app/
├── config/
│   ├── cloudinary.js        # Cloudinary configuration
│   ├── database.js          # MongoDB connection
│   └── nodemailer.js        # Email service configuration
├── controllers/
│   ├── imageUpload.js       # Image upload controller
│   ├── videoUpload.js       # Video upload controller
│   ├── localFileUpload.js   # Local file upload controller
│   ├── imageSizeReducer.js  # Image compression controller
│   └── files/               # Uploaded files directory
├── models/
│   └── File.js              # File schema and model
├── routes/
│   └── FileUpload.js        # Upload routes
├── middlewares/             # Custom middlewares
├── utils/                   # Utility functions
├── server.js                # Main server file
├── package.json             # Dependencies
└── .env                      # Environment variables
```

## Installation

1. Clone the repository

```bash
git clone "https://github.com/AryanAkhare/file-upload-backend"
cd file-upload-app
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=4000
MONGODB_URL=<your-mongodb-connection-string>
CLOUD_NAME=<your-cloudinary-cloud-name>
API_KEY=<your-cloudinary-api-key>
API_SECRET=<your-cloudinary-api-secret>
MAIL_SERVICE=gmail
MAIL_USER=<your-email@gmail.com>
MAIL_PASSWORD=<your-app-specific-password>
JWT_SECRET=<your-jwt-secret-key>
```

## Configuration

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add these credentials to your `.env` file

### MongoDB Setup

1. Create a MongoDB database (local or Atlas)
2. Get your connection string
3. Add it to your `.env` file as `MONGODB_URL`

### Email Setup

1. Use Gmail or another email service
2. For Gmail, enable 2-factor authentication
3. Generate an app-specific password
4. Add your email and app password to `.env`

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server with nodemon, which automatically restarts on file changes.

### Production Mode

```bash
npm start
```

The server will run at `http://localhost:<PORT>`

## API Endpoints

### Upload Routes

- `POST /api/v1/upload/image` - Upload an image to Cloudinary
- `POST /api/v1/upload/video` - Upload a video to Cloudinary
- `POST /api/v1/upload/local` - Upload a file to local storage
- `POST /api/v1/upload/reduce` - Upload and compress an image

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port number (default: 4000) |
| MONGODB_URL | MongoDB connection string |
| CLOUD_NAME | Cloudinary cloud name |
| API_KEY | Cloudinary API key |
| API_SECRET | Cloudinary API secret |
| MAIL_SERVICE | Email service provider |
| MAIL_USER | Email address for sending notifications |
| MAIL_PASSWORD | Email password or app-specific password |
| JWT_SECRET | Secret key for JWT signing |

## Nodemailer Configuration

The email service is configured in `config/nodemailer.js` and provides:

- SMTP-based email sending
- Customizable email templates
- Async mail sending with error handling
- Support for multiple email services

### Usage

```javascript
const mailSender = require('./config/nodemailer');

await mailSender(
  'user@example.com',
  'Upload Successful',
  '<h1>Your file has been uploaded successfully!</h1>'
);
```

## File Models

### File Schema

The File model stores the following information:

- `name` - File name
- `imageUrl` - Cloud or local file URL
- `tags` - File tags
- `email` - User email for notifications

## Error Handling

The application includes comprehensive error handling for:

- Database connection failures
- Cloudinary upload failures
- Email sending failures
- File validation errors
- Authentication errors

## Dependencies

- `bcrypt` - Password hashing
- `cloudinary` - Cloud storage integration
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management
- `express` - Web framework
- `express-fileupload` - File upload middleware
- `jsonwebtoken` - JWT authentication
- `mongoose` - MongoDB ODM
- `nodemailer` - Email sending
- `nodemon` - Development server

## Security Considerations

- Sensitive credentials are stored in `.env` file
- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- File uploads are validated before processing
- CORS is configured to control cross-origin requests

## Troubleshooting

### Database Connection Issues

- Verify MongoDB is running
- Check connection string in `.env`
- Ensure network access is allowed for MongoDB Atlas

### Cloudinary Upload Failures

- Verify cloud name, API key, and secret
- Check file size limits
- Ensure file format is supported

### Email Sending Issues

- Verify email credentials
- Enable less secure app access (Gmail)
- Check SMTP settings in nodemailer config
- Verify firewall rules allow SMTP connections

## Development

To contribute to this project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

For issues and questions, please create an issue in the repository.
