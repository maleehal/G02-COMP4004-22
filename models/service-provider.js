const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")


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
        default:"Include your description here."
    },
    
    about: {
        type: String,
        default:"Include about."
    },
    
    status: {
        type: String,
        default:  "Pending",
        
    },
})

service_providerSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await  bcrypt.hash(this.password,salt)
    next()
})


service_providerSchema.statics.login = async function(username , password){
    const serviceProvider = await this.findOne({username});
    if (serviceProvider){
        const auth = await bcrypt.compare(password, serviceProvider.password)
        if(auth){
            return serviceProvider;
            
        }
        throw Error("Incorrect passsword")

    }
    throw Error("Incorrect username");
}

const serviceProvider = mongoose.model("Service-provider",service_providerSchema)

module.exports = serviceProvider