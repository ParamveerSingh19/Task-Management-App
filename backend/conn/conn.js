require("dotenv").config();
const mongoose = require("mongoose");
const conn = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

conn();
module.exports = conn;
