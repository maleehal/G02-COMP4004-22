const { time } = require("console")
const mongoose = require("mongoose")
const {isEmail} = require("validator")

const bookingSchema = new mongoose.Schema({
    s_id: {
        type: mongoose.SchemaType.ObjectId,
        ref: "customer"
    },
    c_id: {
        type: mongoose.SchemaType.ObjectId,
        ref: "service-provider"
    },
    Status: {
        type: String
    },
    Date: {
        type: Date
    },
    Time: {
        type: Date
    }
})

module.exports = mongoose.model("booking",bookingSchema)