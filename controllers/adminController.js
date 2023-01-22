
const ServiceProvider = require("../models/service-provider")
const Customer = require("../models/customer")
const Booking = require("../models/booking")
const Admin = require("../models/admin")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const maxAge = 3 * 24  * 60 * 60


const createToken = (id) => {
    return jwt.sign({ id },"Admin",{
        expiresIn:maxAge
    })
}

//getting the list of pending service providers

const getPendingProviders = async (req,res) =>{
    
    try {
        const providers = await ServiceProvider.find({status:"Pending"})
        res.send({providers}).status(200)
        
    } catch (error) {
        res.send({error}).status(400)
        
    }
}

//Accepts a service provider and makes him available to serve customers

const verifyProvider = async (req,res) =>{
    const {id} = req.body
    try {
        const provider = await ServiceProvider.findByIdAndUpdate(id,{status:"Verified"},{
            new: true,
            runValidators: true,})
            res.status(200).send({provider})
        
    } catch (error) {
        console.log(error)
        
    }
}

const getCounts = async (req,res) =>{
    try {
        const providerCount = await ServiceProvider.countDocuments({status:"Verified"})
        const deactivatedUsers = await ServiceProvider.countDocuments({status:"Rejected"})
        const customerCount = await Customer.countDocuments({})
        const acceptedOrders = await Booking.countDocuments({status:"Ongoing"})
        const rejectedOrders = await Booking.countDocuments({status:"Rejected"})
        const SerProOngoingBooking = await Booking.countDocuments({status:"Completed"})
        const SerProNoOngoingBooking = await Booking.countDocuments({status:"Pending"})
        res.send({providerCount , deactivatedUsers , customerCount , acceptedOrders , rejectedOrders , SerProOngoingBooking , SerProNoOngoingBooking})
    
    } catch (error) {
        console.log(error)
        
    }
}
// A error handler to display backend errors to the front end

const handleErrors = (error) =>{
    let errors = { name: "",password : "" }
    if(error.message === 'Incorrect username'){
        errors.name = "that email is not registered"
    }
    if(error.message === 'Incorrect passsword'){
        errors.password = "incorrect passsword"
    }
    if (error.code === 11000){
        errors.name = 'This username has already been Registered'
        return errors
    }
    if (error.message.includes("user validation failed")){
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

//Lets the admin login with his credentials and authroizes him
const AdminLogIn = async (req,res) =>{
    const {name , password} = req.body
    try {
        const admin = await Admin.login(name,password)
        const token = createToken(admin._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(200).send({admin:admin._id})  
    } catch (error) {
        console.log(error)
        const errors = handleErrors(error)
        res.status(400).send({errors}) 
    }   
}

//status to rejected
const rejectProvider = async (req,res) =>{
    const {id} = req.body
    try {
        const provider = await ServiceProvider.findByIdAndUpdate(id,{status:"Rejected"},{
            new: true,
            runValidators: true,})
            res.status(200).send({provider})
        
    } catch (error) {
        console.log(error)
        
    }
}

//getting all status verified users
const getServiceProviderVerified = async (req,res) =>{
    
    try {
        const providers = await ServiceProvider.find({status:"Verified"})
        res.send({providers}).status(200)
        
    } catch (error) {
        res.send({error}).status(400)
        
    }
}

//logs the admin out 

const LogoutUser = async (req,res)=>{
    const token = req.cookies.jwt
    jwt.verify(token,"Admin", (err,decodeedToken)=>{
        if(err){
            res.cookie("jwt","",{maxAge:1})
            res.redirect("/startup")
        }
        else{
            res.cookie("jwt","",{maxAge:1})
            res.redirect("/admin-login")
        }
    })
    
}

module.exports = { rejectProvider ,getCounts , verifyProvider , getPendingProviders, getServiceProviderVerified, AdminLogIn, LogoutUser }