const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Database Connected.'))
    .catch((e) => {
      console.log('DB connection issues.');
      console.error(e.message);
    });
};
