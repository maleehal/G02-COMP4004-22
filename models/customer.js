const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"this field is required"],
    },
    email:{
        type:String,
        required:[true,"this field is required"],
        unique:true,
        lowercase:true,
        validate:[isEmail ,"please enter a valid email address" ]
    },
    telephone:{
        type:String
    },
    
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
    profilepic:{
        type:Buffer,
    },
    description:{
        type:String,
    }
})

customerSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await  bcrypt.hash(this.password,salt)
    next()
})


customerSchema.statics.login = async function(username , password){
    const customer = await this.findOne({username});
    if (customer){
        const auth = await bcrypt.compare(password, customer.password)
        if(auth){
            return customer;
            
        }
        throw Error("Incorrect passsword")

    }
    throw Error("Incorrect username");
}

const customer = mongoose.model("Customer",customerSchema)

module.exports = customer;