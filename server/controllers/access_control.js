const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const users = require('../Data-Base/Models/user');
const control_data = require('../utils/control-data.json');

exports.access_controller = async function (access_type, req, res, next) {
    let allowed = access_type.split(',').map((obj) => control_data[obj]);

    try {
        if (access_type === '*') {
            return next();
        }

        let authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(400).send({
                success: false,
                message: "Authorization header missing"
            });
        }

        let token = authHeader.split(' ')[1];
        if (!token || token === "" || token === "null" || token === "undefined") {
            return res.status(400).send({
                success: false,
                message: "Invalid Token"
            });
        }

        jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid or expired token"
                });
            }

            
            let user_id = decoded.userId;

            let user = await users.findOne({ _id: user_id });

            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "User not found"
                });
            }

           
            let user_type = user.user_type;

            if (allowed && allowed.includes(user_type)) {
                return next();
            } else {
                return res.status(403).send({
                    success: false,
                    message: "User not allowed in the route"
                });
            }
        });
    } catch (error) {
        console.log("error : ", error);
        return res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};
