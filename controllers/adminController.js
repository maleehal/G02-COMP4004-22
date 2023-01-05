
const ServiceProvider = require("../models/service-provider")
const Customer = require("../models/customer")

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
        const provider = await ServiceProvider.findByIdAndUpdate({_id:id},{status:"Verified"},{
            new: true,
            runValidators: true,})
            res.status(200).send({provider})
        
    } catch (error) {
        
    }
}

const getCounts = async (req,res) =>{
    try {
        const providerCount = await ServiceProvider.countDocuments({status:"Verified"})
        const deactivatedUsers = await ServiceProvider.countDocuments({status:"Rejected"})
        const customerCount = await Customer.countDocuments({})
        res.send({providerCount , deactivatedUsers , customerCount})
        
    } catch (error) {
        
    }
}


const rejectProvider = async (req,res) =>{
    const {id} = req.body
    try {
        const provider = await ServiceProvider.findByIdAndUpdate({_id:id},{status:"Rejected"},{
            new: true,
            runValidators: true,})
            res.status(200).send({provider})
        
    } catch (error) {
        
    }
}

module.exports = { rejectProvider , getCounts , verifyProvider , getPendingProviders}