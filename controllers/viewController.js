const ServiceProvider = require("../models/service-provider")
const Customers = require("../models/customer")
const Booking = require("../models/booking")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")


const displayStartup = async (req,res)=>{
    res.render("startup")
}
const displayServiceSignUp  = async (req,res)=>{
    res.render("signup-service")
}
const displayServiceLogin = async (req,res)=>{
    res.render("login-service")
}
const displayPending = async (req,res) =>{
    res.render("pending")
}
const displayCustomerSignUp = async (req,res) =>{
    res.render("signup-customer")
}
const displayCustomerLogin = async (req,res) =>{
    res.render("login-customer")
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


const displayHomePage = async(req,res) =>{
    try {
        const topThreeProviders = await ServiceProvider.find({}).sort({rating:-1}).limit(3)
        res.render("home",{topThreeProviders})
        
    } catch (error) {
        console.log("error")
        
    }
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


const viewRc = async (req,res) =>{ 
    res.render("rc");  
}

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
    const token = req.cookies.jwt
    jwt.verify(token, "Customer", async (error, decodedtoken)=>{
        if(error){
            console.log(error)
        }else{
            const id = decodedtoken.id
            const bookings = await Booking.find({c_id:id})
            res.render("customer_schedule", {
                bookings:bookings
            })
        }
    })
}


module.exports = {
    displayStartup, displaySignupService, displaySignupCustomer, displayLoginService, displayLoginCustomer, displayHome, 
    displayProviderProfile, displayProviderSchedule, displaypageToCustomer, customerSchedule, search, booking, displayAdmin,
    displayPending, viewRc
}