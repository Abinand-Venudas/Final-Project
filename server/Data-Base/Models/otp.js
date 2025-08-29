// otp.js
const mongoose = require("mongoose");

// Define schema
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60, // document will be auto deleted after 30s 
  },
});

// Create model
const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
