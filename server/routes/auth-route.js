const express = require("express")
const router = express.Router();
const authController = require("../controllers/authcontrollers")

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.post("/emailVerification", authController.emailVerification);
router.post("/otpVerification", authController.otpVerification);
router.post("/changePassword/:email", authController.changePassword);

module.exports = router;