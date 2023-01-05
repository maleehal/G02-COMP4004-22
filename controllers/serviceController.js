
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const ServiceProvider = require("../models/service-provider")


const maxAge = 3 * 24  * 60 * 60



const createToken = (id) => {
    return jwt.sign({ id },"ServiceProvider",{
        expiresIn:maxAge
    })
}

const handleErrors = (error) =>{
    let errors = { username : "",password : "" ,verification:"" }
    if(error.message === 'Incorrect username'){
        errors.username = "that username is not registered"
    }
    if(error.message === 'Incorrect passsword'){
        errors.password = "incorrect passsword"
    }
    if(error.message === 'Account not Verified'){
        errors.verification = "Account not Verified"
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





const getAllproviders = async (req,res) =>{
    try {
        const providers = await ServiceProvider.find({status:"Verified"}).select("name email expertise")
        res.status(200).send({providers}) 
        
    } catch (error) {
        res.status(400).send({msg:"errors"}) 
        
    }


}

const signUpService = async (req,res) =>{
    const {name,email,telephone,username,password,expertise} =req.body
    try{
        const provider = await ServiceProvider.create({name,email,telephone,username,password,expertise})
        res.status(200).send({provider}) 
    }
    catch(errors){
        console.log(errors)
        res.status(400).send({msg:"errors"}) 

    }
}

// const updateServiceDescription = async (req,res) =>{
//     console.log("came here")
//     const {descriptionData,id} = req.body
//     console.log(req.params)
//     console.log(id)
//     console.log(descriptionData)
//     const Updateprovider = await ServiceProvider.findByIdAndUpdate(id,{description:descriptionData},{runValidators:true})
//     console.log(Updateprovider)


// }
const serviceLogIn = async (req,res) =>{
    const {username , password} = req.body
    try {
        const provider= await ServiceProvider.login(username,password)
        const token = createToken(provider._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(200).send({provider:provider._id})  
    } catch (error) {
        const errors = handleErrors(error)
        console.log(errors)
        res.status(200).send({errors}) 
    }   
}

const displaySignUpPage = (req,res) =>{
    res.render("signup-service")
}

const displayLogInPage = (req,res) =>{
    res.render("login-service")
}

module.exports = {getAllproviders , displayLogInPage , displaySignUpPage , signUpService, serviceLogIn}

