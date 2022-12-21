const Customer = require("../models/customer")

const customerSignIn = async (req,res) =>{
    const {name,username,password,email} = req.body
    const newCustomer = await Customer.create(name,username,password,email)
    res.status(201).json({ task })
}

module.exports = {customerSignIn}



