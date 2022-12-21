const Customer = require("../models/customer")

const customerSignIn = async (req,res) =>{

    const {name} = req.body
    const newCustomer = await Customer.create({name})
    res.status(201).json({task:"succesful"})
}

module.exports = {customerSignIn}



