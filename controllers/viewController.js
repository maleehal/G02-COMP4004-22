const ServiceProvider = require("../models/service-provider")
const Customers = require("../models/customer")
const Booking = require("../models/booking")
const Comment =require("../models/comment")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")


const displayStartup = async (req,res)=>{
    res.render("startup")
}

const displaySignupService  = async (req,res)=>{
    res.render("signup-service")
}

const displayLoginService = async (req,res)=>{
    res.render("login-service")
}
const displayPending = async (req,res) =>{
    res.render("pending")
}
const displaySignupCustomer = async (req,res) =>{
    res.render("signup-customer")
}
const displayLoginCustomer = async (req,res) =>{
    res.render("login-customer")
}
const displayHome = async (req,res)=>{
    try{
        const topThreeProviders = await ServiceProvider.find({}).sort({rating:-1}).limit(3)
    res.render('home',{topThreeProviders})
    } catch (error) {
        console.log("error")
    }
}

const search = async (req,res)=>{
    const {searchkey , filter} = req.query;
    console.log("came")
    let providers
    if (filter){
      console.log("came again")
      providers  = await ServiceProvider.find({expertise:`${filter}`})
      console.log(providers)
    }
    if (searchkey){
      console.log("came to die")
      providers = await ServiceProvider.find({username:new RegExp(`^${searchkey}`,"i")})
      console.log(providers)
    }
    res.render("search",{providers})
}

const displayProviderProfile = async (req,res) =>{ 
    const token = req.cookies.jwt
    jwt.verify(token, "ServiceProvider", async (error, decodedtoken)=>{
        if(error){
            console.log(error)
        }else{
            const id = decodedtoken.id
            const comments = await Comment.find({s_id:id})
            res.render("service_provider", {
                comments:comments
            })
        }    
    }) 
}

const displayProviderSchedule = async (req,res)=>{
    const token = req.cookies.jwt
    jwt.verify(token, "ServiceProvider", async (error, decodedtoken)=>{
        if(error){
            console.log(error)
        }else{
            const id = decodedtoken.id
            const bookings = await Booking.find({s_id:id}).populate("c_id")
            res.render("service_provider_schedule", {
                bookings:bookings
            })
        }
    })    
};

const viewRc = async (req,res) =>{ 
    res.render("rc");  
}

const displaypageToCustomer = async (req,res) =>{
    const {id} = req.params
    const serviceProvider = await ServiceProvider.findById(id)
    const comments = await Comment.find({s_id:id})
    const flag = "cu"
    res.render("service_provider",{
        user:serviceProvider, flag,
        comments:comments
    }) 
}

const booking = async (req,res) =>{
    res.render("booking")
}

const customerSchedule = async (req,res) =>{
    const token = req.cookies.jwt
    jwt.verify(token, "Customer", async (error, decodedtoken)=>{
        if(error){
            console.log(error)
        }else{
            const id = decodedtoken.id
            const bookings = await Booking.find({c_id:id}).populate("s_id")
            res.render("customer_schedule", {
                bookings:bookings
            })
        }
    })
}

const displayAdmin = (req,res)=>{
    res.render("admin")
}

module.exports = {
    displayStartup, displaySignupService, displaySignupCustomer, displayLoginService, displayLoginCustomer, displayHome, 
    displayProviderProfile, displayProviderSchedule, displaypageToCustomer, customerSchedule, search, booking, 
    displayPending, viewRc, displayAdmin
}