
const ServiceProvider = require("../models/service-provider")
const Customer = require("../models/customer")
const Booking = require("../models/booking")



const getPendingProviders = async (req,res) =>{
    
    try {
        const providers = await ServiceProvider.find({status:"Pending"})
        res.send({providers}).status(200)
        
    } catch (error) {
        res.send({error}).status(400)
        
    }
}

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




module.exports = { rejectProvider ,getCounts , verifyProvider , getPendingProviders, getServiceProviderVerified }