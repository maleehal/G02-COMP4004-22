const mongoose = require("mongoose")

const commentSchema =new mongoose.Schema({
    
    s_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service-provider"
    },

    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    
    content: {
        type :String,
    },
    
    date: {
        type:Date,
        default:Date.now,
    },

    rating: {
        type: Number,
    }
})

module.exports = mongoose.model("Comment", commentSchema)