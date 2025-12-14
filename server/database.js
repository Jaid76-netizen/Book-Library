/*  

const mongoose = require("mongoose");

const dataBaseConnection = async () => {
    mongoose
    .connect("mongodb://localhost:27017/book")
    .then(() => {
        console.log("Database connected succesfully");
    })
    .catch((err) => {
        console.log("database connection failed" , err);
    })
};

module.exports = dataBaseConnection;
*/

const mongoose = require("mongoose");

const dataBaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookstore");
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Database connection failed", err);
  }
};

module.exports = dataBaseConnection;

