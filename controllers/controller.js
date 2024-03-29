const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const Customer = require("../models/customer")
const Booking = require("../models/booking")
const Comment = require("../models/comment")

const maxAge = 3 * 24  * 60 * 60


const createToken = (id) => {
    return jwt.sign({ id },"Customer",{
        expiresIn:maxAge
    })
}

const customerSignIn = async (req,res) =>{
    const {name,email,telephone,username,password,expertise,flag} = req.body
    console.log(flag)
    try {
        const customer = await Customer.create({name,email,telephone,username,password})
        res.status(201).send({task:"succesful",user:customer})
    } catch (error) {
        console.log(error)
        const errors = handleErrors(error);
        res.status(400).send({errors}) 
    }
}

const LogoutUser = async (req,res)=>{
    const token = req.cookies.jwt
    jwt.verify(token,"", (err,decodeedToken)=>{
        res.cookie("jwt","",{maxAge:1})
        res.redirect("/startup")
    })  
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

const createBooking = async (req, res) => {
    const {event, date, s_id} = req.body
    token = req.cookies.jwt
    
    try {
        jwt.verify(token,"Customer",async (err,decodeedToken)=>{
            if(err){
              console.log(ërror)
            }
            else{
                const c_id = decodeedToken.id
                await Booking.create({c_id,s_id,event,date})
            }
        })
        
    } catch (error) {
        console.log(error)
        
    }
}


const createComment = async (req,res) =>{
    const {rating,content,s_id} = req.body
    token = req.cookies.jwt
    try {
        jwt.verify(token,"Customer",async (err,decodeedToken)=>{
            if(err){
              console.log(error)
            }
            else{ 
                const c_id = decodeedToken.id
                await Comment.create({s_id,c_id,rating,content})

            }
        })
    } catch (error) {
        console.log(error)
    }
}



module.exports = {customerSignIn , customerLogIn , LogoutUser, createBooking, createComment}
