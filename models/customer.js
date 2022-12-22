const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"this field is required"],
        

    },
    username:{
        type:String,
        required:[true,"this field is required"],
        unique:true,
        lowercase:true,

        

    },
    email:{
        type:String,
        required:[true,"this field is required"],
        unique:true,
        lowercase:true,
        validate:[isEmail ,"please enter a valid email address" ]
    },
    password:{
        required:[true,"this field is required"],
        type:String,
        minlength:[6 ,"minimum 6 characters required"]
    },
    profilepic:{
        type:Buffer,
    }
})

module.exports = mongoose.model("Customer",customerSchema)