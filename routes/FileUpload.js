const express = require('express');
const router = express.Router();

// Import modular controllers
const { localFileUpload } = require('../controllers/localFileUpload');
const { imageUpload } = require('../controllers/imageUpload');
const { videoUpload } = require('../controllers/videoUpload');
const { imageSizeReducer } = require('../controllers/imageSizeReducer');

// File upload routes
router.post('/local', localFileUpload);
router.post('/image', imageUpload);
router.post('/video', videoUpload);
router.post('/image/reduce-size', imageSizeReducer);


module.exports=router;
