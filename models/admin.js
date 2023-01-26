const mongoose = require("mongoose")
const AdminSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,"this field is required"],
        unique:true,
        lowercase:true,
    },
   
    password:{
        required:[true,"this field is required"],
        type:String,
        minlength:[6 ,"minimum 6 characters required"]
    },
})




AdminSchema.statics.login = async function(name , password){
    const admin = await this.findOne({name});
    if (admin){
      if(admin.password === password){
        return admin
      }
        throw Error("Incorrect passsword")

    }
    throw Error("Incorrect Name");
}

const admin = mongoose.model("Admin",AdminSchema)

module.exports = admin;