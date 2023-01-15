const mongoose = require("mongoose")

const CommentSchema =new mongoose.Schema({
    
    s_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service-provider"
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

const Comment = mongoose.model("Comment",CommentSchema)

module.exports = Comment;