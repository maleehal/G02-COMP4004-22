const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const ServiceProvider = require("../models/service-provider")
const Booking = require("../models/booking")
<<<<<<< HEAD
const Comment = require("../models/comment")
=======
const Comments = require("../models/comment")
>>>>>>> 48f4559b3d768944add8e8ce81487a418e875c12

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

const updateProviderDetails = async (req,res)=>{
    const token = req.cookies.jwt
    jwt.verify(token, "ServiceProvider", async (error, decodedtoken)=>{
        if(error){
            console.log(error)
        }else{
            const id = decodedtoken.id
            const {descriptionData,aboutData} = req.body
            const Updateprovider = await ServiceProvider.findByIdAndUpdate(id,{description:descriptionData, about:aboutData},{runValidators:true})    
        }
    })
};

const acceptAppoinments = async (req,res)=>{
    const {dataID ,changed} = req.body
    try {
        const acceptAppoinment = await Booking.findByIdAndUpdate(dataID,{status:changed},{runValidators:true})
    }catch(error){
        console.log(error)
    }
};

const rejectAppoinments = async (req,res)=>{
    const {dataID ,changed} = req.body
    try {
        const rejectAppoinment = await Booking.findByIdAndUpdate(dataID,{status:changed},{runValidators:true})
    }catch(error){
        console.log(error)
    }
};

const getOngoingDates = async(req,res)=>{
    try{
        const ongoingDates = await Booking.find({status:"Ongoing"}).select("date")
        res.status(200).send({ongoingDates})
    } catch (error) {
        res.status(400).send({msg:"errors"})  
    }
}

const defaultCompletedAppoinment = async(req,res)=>{
    const {dataID, changed} = req.body
    try {
        const defaultCompletedAppoinment = await Booking.findByIdAndUpdate(dataID,{status:changed},{runValidators:true})
    }catch(error){
        console.log(error)
    }
}

const completedAppoinments = async(req,res)=>{
    try{
        const completedAppoinments = await Booking.find({status:"Ongoing"}).select("date")
        res.status(200).send({completedAppoinments})
    } catch (error) {
        res.status(400).send({msg:"errors"})  
    }
}

const getBuisnessPerformance = async (req,res)=>{
    const token = req.cookies.jwt
    jwt.verify(token, "ServiceProvider", async (error, decodedtoken)=>{
        if(error){
            console.log(error)
        }else{
            const id = decodedtoken.id
            const numberOfOngoingProvider = await Booking.countDocuments({s_id:id, status:"Ongoing" })
            const numberOfPendingProvider = await Booking.countDocuments({s_id:id, status:"Pending" })
            const numberOfCompletedProvider = await Booking.countDocuments({s_id:id, status:"Completed" })
            const numberOfRejectedProvider = await Booking.countDocuments({s_id:id, status:"Rejected" })
            res.status(200).send({numberOfOngoingProvider, numberOfPendingProvider, numberOfCompletedProvider, numberOfRejectedProvider})    
        }
    }) 
};

<<<<<<< HEAD

module.exports = {
    getAllproviders , signUpService, serviceLogIn, updateProviderDetails, 
    acceptAppoinments, rejectAppoinments, getOngoingDates, defaultCompletedAppoinment, completedAppoinments, getBuisnessPerformance
=======
const displayProviderProfile = async (req,res) =>{ 
    const token = req.cookies.jwt
    jwt.verify(token, "ServiceProvider", async (error, decodedtoken)=>{
        if(error){
            console.log(error)
        }else{
            const id = decodedtoken.id
            const comments = await Comment.find({s_id:id})
            console.log(comments);
            res.render("service_provider", {
                comments:comments
            })
        }
        
        
    }) 
}
module.exports = {
    getAllproviders , displayLogInPage , displaySignUpPage , signUpService, serviceLogIn, updateProviderDetails, 
    acceptAppoinments, rejectAppoinments, getOngoingDates, defaultCompletedAppoinment, completedAppoinments, 
    getBuisnessPerformance, displayProviderProfile
>>>>>>> 48f4559b3d768944add8e8ce81487a418e875c12
}
