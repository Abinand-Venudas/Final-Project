// otp.js
const mongoose = require("mongoose");

// Define schema
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // document will be auto deleted after 300s (5 min)
  },
});

// Create model
const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
