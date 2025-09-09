const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    specification:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stocks:{
        type:Number,
        required:true
    }

})
module.exports = mongoose.model("Products", productSchema)