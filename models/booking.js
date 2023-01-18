const { time } = require("console")
const mongoose = require("mongoose")
const {isEmail} = require("validator")

const bookingSchema = new mongoose.Schema({
    s_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service-provider"
    },
    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
<<<<<<< HEAD
    },
    event: {
        type: String
=======
>>>>>>> 48f4559b3d768944add8e8ce81487a418e875c12
    },
    status: {
        type: String,
        default:"Pending",
        enum:["Ongoing","Pending","Completed","Rejected"]
    },
    date: {
        type: Date,
        default:Date.now,
        // required:[true,"this field is required"]
        
    }
})

const Booking = mongoose.model("booking",bookingSchema)

module.exports = Booking

