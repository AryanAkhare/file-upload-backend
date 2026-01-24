const express=require('express')
const router=express.Router()

// const {imageUpload,videoUpload,imageReducerUpload}
const {localFileUpload}=require('../controllers/fileUpload')

router.post('/',localFileUpload);

module.exports=router;
