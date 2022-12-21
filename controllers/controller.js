const Customer = require("../models/customer")

const customerSignIn = async (req,res) =>{

    const {name} = req.body
    const newCustomer = await Customer.create({name})
    res.status(201).json({task:"succesful"})
}

const customerLogOut = async (req,res) =>{
    
    
    res.status(200).send("customer has logout")
}

const customerLogIn = async (req,res) =>{
    res.status(200).send("customer has Logged in")
    
}



module.exports = {customerSignIn , customerLogIn , customerLogOut}



