const mongoose = require("mongoose")
const {isEmail} = require("validator")


const service_providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"This field is required."],

    },

    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true,"This field is required."],
        validate: [isEmail,"Please enter a valid Email."]

    },

    telephone: {
        type: Number,
        unique: true,
        min: 10,
        max: 10,
        required: [true, "Please enter a phone number."]

    },

    pimg: {
        type: Buffer,
    },

    expertise: {
        type:Array

    },

    username: {
        type: String,
        required: [true,"This field is required."],

    },

    password: {
        type: String,
        required:[true,"This field is required"]
    },

    description: {
        type: String,
        required: [true,"This field is required"]
    },
    
    about: {
        type: String,
        required: [true,"This field is required"]
    },
    
    status: {
        type: String,
        default:  "Pending",
        enum:["Pending","Completed","Accepted","Rejected"]
    },
})

module.exports = mongoose.model("Service_provider",service_providerSchema)