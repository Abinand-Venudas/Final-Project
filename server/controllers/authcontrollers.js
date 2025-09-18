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
}

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
            code: setOTP
        };

        let userData = await Otp.create(data);
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

exports.otpVerification = async function (req, res) {
    try {
        let email = req.body.email
        let code = req.body.code

        if (!code) {
            return res.status(400).send({
                success: false,
                message: "Enter the OTP"
            })
        }

        let matchCode = await Otp.findOne({ email }).sort({ createdAt: -1 });

if (!matchCode) {
  return res.status(400).send({
    success: false,
    message: "OTP expired or not found"
  });
}

// Compare as strings without spaces
if (String(matchCode.code).trim() !== String(code).trim()) {
  return res.status(400).send({
    success: false,
    message: "Code doesn't match"
  });
}
        return res.status(200).send({
            success: true,
            message: "OTP verified successfully"
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        })

    }
}

exports.changePassword = async function (req, res) {
  try {
    const email = req.params.email;
    const { password, changePassword } = req.body;

    if (!password || !changePassword) {
      return res.status(400).send({
        message: "Both password fields are required",
        success: false,
      });
    }

    if (password !== changePassword) {
      return res.status(400).send({
        message: "Password and confirm password do not match",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(changePassword, 10);
    await users.updateOne({ email }, { $set: { password: hashedPassword } });

    return res.status(200).send({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};
