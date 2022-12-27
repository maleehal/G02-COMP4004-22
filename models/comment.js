const mongoose = require("mongoose")

const commentSchema =new mongoose.Schema({
    
    sp_id: {
        type: mongoose.SchemaType.ObjectId,
        ref: "service-provider"
    },

    cu_id: {
        type: mongoose.SchemaType.ObjectId,
        ref: "customer"
    },
    
    content: {
        type :String,
    },
    
    date: {
        type:date,
    }
})

module.exports = mongoose.model("comment", commentSchema)