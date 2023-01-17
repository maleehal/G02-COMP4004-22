const ServiceProvider = require("../models/service-provider")
const Customers = require("../models/customer")
const Booking = require("../models/booking")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const Comment = require("../models/comment")
const { argv } = require("process")

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

const viewRc = async (req,res) =>{ 
    res.render("rc");  
}

const displaypageToCustomer = async (req,res) =>{
    const {id} = req.params
    // console.log(id)
    const serviceProvider = await ServiceProvider.findById(id)
    const comments = await Comment.find({s_id:id}).populate("c_id")
    const [onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg] = await ratingStats(id)

    const flag = "cu"
    res.render("service_provider",{
        user:serviceProvider, flag,
        comments:comments, onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg
    }) 
}

const ratingStats = async (id) => {
    try {
        console.log(id)
        const totalRating = await Comment.countDocuments({s_id:id})
        const fiveStar = await Comment.countDocuments({rating:5,s_id:id})
        const fourStar = await Comment.countDocuments({rating:4,s_id:id})
        const threeStar = await Comment.countDocuments({rating:3,s_id:id})
        const twoStar = await Comment.countDocuments({rating:2,s_id:id})
        const oneStar = await Comment.countDocuments({rating:1,s_id:id})
        
        const onestarPr = getPercentage(oneStar, totalRating)
        const twostarPr = getPercentage(twoStar, totalRating)
        const threestarPr = getPercentage(threeStar, totalRating)
        const fourstarPr = getPercentage(fourStar, totalRating)
        const fivestarPr = getPercentage(fiveStar, totalRating)

        const dpAvg = getAverage(oneStar, twoStar, threeStar, fourStar, fiveStar, totalRating)

        return [onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg]


        

    } catch (error) {
        
    }
}
const getPercentage = (rating,totalRating) =>{
    const percentageValue = (rating/totalRating)*100
    return percentageValue
}

const getAverage = (ratingOne, ratingTwo, ratingThree, ratingFour, ratingFive, totalRating) => {
    const avg = ((ratingOne * 1) + (ratingTwo * 2) + (ratingThree * 3) + (ratingFour * 4) + (ratingFive * 5)) / totalRating

    if (isNaN(avg) == true) {
        finalAvg = 0;
    }else {
        finalAvg = avg.toFixed(1)
    }
    return finalAvg
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
    displayPending, viewRc
}