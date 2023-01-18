const mongoose = require("mongoose")

const CommentSchema =new mongoose.Schema({
    
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

<<<<<<< HEAD
const Comment = mongoose.model("Comment",CommentSchema)

module.exports = Comment;
=======
module.exports = mongoose.model("Comment", commentSchema)
>>>>>>> 48f4559b3d768944add8e8ce81487a418e875c12
