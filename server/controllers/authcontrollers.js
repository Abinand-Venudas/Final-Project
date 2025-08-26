const users = require('../Data-Base/Models/user')
const bcrypt = require('bcryptjs');
const OTPgenerate = require('../utils/otpGenerator');
const Otp = require('../Data-Base/Models/otp');

exports.signUp =  async function (req,res) {
    try {
        let body = req.body;
        let name = body.name;
        let email = body.email;
        let password = body.password;

        if(!name){
            return res.status(400).send({
                message : "Name is required",
                success : false
            });
        }

        if(!email){
            return res.status(400).send({
                message : "Email is required",
                success : false
            });
        }
        if(!password){
            return res.status(400).send({
                message : "Password is required",
                success : false
            });
        }
        let emailCheck = await users.findOne({email : email})

        if(emailCheck){
            return res.status(400).send({
                message : "Email already exists",
                success : false
            });
        }

        let salt = bcrypt.genSaltSync(10)
        let hashedPassword = bcrypt.hashSync(password, salt);

        let userType = "buyer";

        let data = {
            name : name,
            email : email,
            password : hashedPassword,
            user_type : userType
        }
        let userData = await users.create(data);
        return res.status(200).send({
            message : "Account created successfully",
            success : true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message : error.message || error,
            success : false
        })
            
    }
}



exports.login = async function (req, res) {
    try {
        let body = req.body;
        let email = body.email;
        let password = body.password;

        // Check if email is provided
        if (!email) {
            return res.status(400).send({
                message: "Email is required",
                success: false
            });
        }

        // Check if password is provided
        if (!password) {
            return res.status(400).send({
                message: "Password is required",
                success: false
            });
        }

        // Find user by email
        let userData = await users.findOne({ email: email });
        if (!userData) {
            return res.status(400).send({
                message: "User not found",
                success: false
            });
        }

        // Compare password
        let isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).send({
                message: "Invalid password",
                success: false
            });
        }

        // Success
        return res.status(200).send({
            message: "Login successful",
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: error.message || 5000,
            success: false
        });
    }
};


exports.emailVerification = async function (req, res) {
    try {
        let email = req.body.email;
        
        if (!email) {
            return res.status(400).send({
                message: "Email is required",
                success: false
            });
        }

        let checkEmail = await users.findOne({ email});
        if (!checkEmail) {
            return res.status(400).send({
                message: "User not found",
                success: false
            });
        }

        let setOTP = OTPgenerate(6);
        console.log("setOTP: ", setOTP)

       
        let data = {
            email: email,
            otp: setOTP
        };

        let userData = await otp.create(data);
        return res.status(200).send({
            message: "OTP sent to your email",
            success: true
        });

    } catch (error) {
        console.log(error); 
        return res.status(400).send({
            message: error.message || 5000,
            success: false
        });
    }
}

exports.otpVerification = async function (req,res){
    try {
        let otpFrontend = req.body.otp;
        let otpdata = await Otp.findOne({otp:otpFrontend});

        if(!otpdata){
            return res.status(400).send({
                message: "Invalid OTP",
                success: false
            });
        }

        return res.status(200).send({
            message: "OTP verified successfully",
            success: true
        });
    } catch (error) {
        console.log();
         return res.status(400).send({
            message: error.message || 5000,
            success: false
        });
    }
}