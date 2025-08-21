const users = require('../Data-Base/Models/user')
const bcrypt = require('bcrypt.js');

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

exports.login = async function (req,res) {
    try {
        let body = req.body;
        let email = body.email;
        let password = body.password
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

        const user = await user.findOne({email : email})
        if(!user){
            return res.status(400).send({
                message : "Invalid email",
                success : false
            });
        }

        const match = await bcrypt.compareSync(password , user.password);
        if(!match){
             return res.status(400).send({
                message : "Invalid password",
                success : false
            });
        }
        else{
            let response = success_function(
                {
                    success:true,
                    statusCode:200,
                    message:"Login successfull"
                }
            );
            res.status(response.statusCode).send(response)
            return;
        }


        
    } catch (error) {
         console.log(error);
        return res.status(400).send({
            message : error.message || error,
            success : false
        })
    }
    
}