const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true
        },
    email:{
        type:String,
        required:true,
        unique:true
       },
       password:{
        type:String,
        required:true
       },
       mobile:{
        type:Number,
       },
       address:{
        type:String
       },
       cart:{
        type:[String]
       },
       wish:{
        type:[String]
       },
       user_type:{
        type:String
       }


})
module.exports = mongoose.model("Users" , userSchema)