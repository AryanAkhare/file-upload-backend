const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const mailSender = async (email, title, body) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body,
    };

    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (error) {
    console.error('Error sending mail:', error.message);
    throw error;
  }
};

module.exports = mailSender;
