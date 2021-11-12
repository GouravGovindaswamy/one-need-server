const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);
  
const connectDB = async() => {
    mongoose
    .connect(DB, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB connnection successful!'));
}

module.exports = connectDB;