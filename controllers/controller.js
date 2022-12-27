
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
// const ServiceProvider = require("../models/service-provider")
const Customer = require("../models/customer")

const maxAge = 3 * 24  * 60 * 60



const createToken = (id) => {
    return jwt.sign({ id },"Customer",{
        expiresIn:maxAge
    })
}



const customerSignIn = async (req,res) =>{
    const {name,email,telephone,username,password,expertise,flag} = req.body
    console.log(flag)
    // if (flag === 'CUSTOMER'){
            try {
                console.log("came")
                const customer = await Customer.create({name,email,telephone,username,password})
                res.status(201).send({task:"succesful",user:customer})
            } catch (error) {
                const errors = handleErrors(error);
                res.status(400).send({errors}) 
            }
    // }
    // else{
    //     try{
    //         const provider = await ServiceProvider.create({name,email,telephone,username,password,expertise})
    //         res.status(200).send({provider}) 
    //     }
    //     catch(errors){
    //         console.log(errors)
    //         res.status(400).send({msg:"errors"}) 
    
    //     }

    // }
   
}

const customerLogIn = async (req,res) =>{
    const {username , password} = req.body
    try {
        const customer= await Customer.login(username,password)
        const token = createToken(customer._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(200).send({customer:customer._id})  
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).send({errors}) 
    }   
}






const customerLogOut = async (req,res) =>{
    res.status(200).send({success:true,msg:"customer has logged-out"})
}

const displaySignUpPage = (req,res) =>{
    res.render("signup-customer")
}

const displayLogInPage = (req,res) =>{
    res.render("login-customer")
}





const handleErrors = (error) =>{
    let errors = { username : "",password : "" }
    if(error.message === 'Incorrect username'){
        errors.username = "that email is not registered"
    }
    if(error.message === 'Incorrect passsword'){
        errors.password = "incorrect passsword"
    }
    if (error.code === 11000){
        errors.username = 'This username has already been Registered'
        return errors
    }
    if (error.message.includes("user validation failed")){
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}






module.exports = {customerSignIn , customerLogIn , customerLogOut ,displayLogInPage ,displaySignUpPage}



