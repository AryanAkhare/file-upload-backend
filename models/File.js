const mongoose = require('mongoose');
const mailSender = require('../config/nodemailer');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});


//post middlware after Schema
fileSchema.post('save',async function(doc){
    try{
        const emailBody = `<b>Hello, your file "${doc.name}" has been uploaded successfully.</b> View here: <a href="${doc.imageUrl}">Image Link</a>`;
        
        await mailSender(doc.email, "File Upload Successful", emailBody);
        console.log("Email sent successfully to:", doc.email);
    }catch(err){
        console.error("Error in post-save middleware:", err);
    }
});
module.exports = mongoose.model("File", fileSchema);
