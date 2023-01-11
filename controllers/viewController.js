const ServiceProvider = require("../models/service-provider")
const Customers = require("../models/customer")
const Booking = require("../models/booking")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const displayStartup = async (req,res)=>{
    res.render("startup")
}

const displaySignupService = async (req,res)=>{
    res.render("signup-service")
}

const displayPending = async (req,res) =>{
    res.render("pending")
}

const displaySignupCustomer = async (req,res)=>{
    res.render("signup-customer")
}

const displayLoginCustomer = async (req,res)=>{ 
    res.render("login-customer")
}
const displayLoginService = async (req,res)=>{
    res.render("login-service")
}

const displayHome = async (req,res)=>{
    res.render('home')
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
    res.render("service_provider");  
}

const displayProviderSchedule = async (req,res)=>{
    const token = req.cookies.jwt
    jwt.verify(token, "ServiceProvider", async (error, decodedtoken)=>{
        if(error){
            console.log(error)
        }else{
            const id = decodedtoken.id
            const bookings = await Booking.find({s_id:id})
            res.render("service_provider_schedule", {
                bookings:bookings
            })
        }
    })    
};

const displaypageToCustomer = async (req,res) =>{
    const {id} = req.params
    const serviceProvider = await ServiceProvider.findById(id)
    const flag = "cu"
    res.render("service_provider",{user:serviceProvider,flag})
}

const booking = async (req,res) =>{
    res.render("booking")
}

const customerSchedule = async (req,res) =>{
res.render("customer_schedule")
}

const displayAdmin = async (req,res) =>{
    res.render("admin")
}

module.exports = {
    displayStartup, displaySignupService, displaySignupCustomer, displayLoginService, displayLoginCustomer, displayHome, 
    displayProviderProfile, displayProviderSchedule, displaypageToCustomer, customerSchedule, search, booking, displayAdmin,
    displayPending
}