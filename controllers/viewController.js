const ServiceProvider = require("../models/service-provider")
const Booking = require("../models/booking")
const Comment = require("../models/comment")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")


const displayStartup = (req,res)=>{
    res.render("startup")
}
const search = (req,res) =>{
    res.render("search")
}
const displayAdminLogin= (req,res)=>{
    res.render("adminLogin")
}

const displaySignupService  = (req,res)=>{
    res.render("signup-service")
}

const displayLoginService = (req,res)=>{
    res.render("login-service")
}
const displayPending = (req,res) =>{
    res.render("pending")
}
const displaySignupCustomer = (req,res) =>{
    res.render("signup-customer")
}
const displayLoginCustomer = (req,res) =>{
    res.render("login-customer")
}
const viewRc = (req,res) =>{ 
    res.render("rc");  
}
const booking = (req,res) =>{
    res.render("booking")
}
const displayAdmin = (req,res)=>{
    res.render("admin")
}

const displayHome = async (req,res)=>{
    try{
        const topThreeProviders = await ServiceProvider.find({}).sort({rating:-1}).limit(3)
    res.render('home',{topThreeProviders})
    } catch (error) {
        console.log("error")
    }
}



const renderProfile = async (req,res) =>{
    const {id} = req.params
    const token = req.cookies.jwt;
    jwt.verify(token,"ServiceProvider",async (error,decodedtoken)=>{
        if (error){
            const serviceProvider = await ServiceProvider.findById(id)
            const comments = await Comment.find({s_id:id}).populate("c_id")
            const [onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg] = await ratingStats(id)
            const defaultTopProvider = await ServiceProvider.findByIdAndUpdate(id,{rating:dpAvg},{runValidators:true})
            const flag = "cu"
            res.render("service_provider",{
                user:serviceProvider, flag,
                comments:comments,
                onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg
            })    
        }
        else{
            
            if(typeof id == undefined){
                const serviceProvider = await ServiceProvider.findById(decodedtoken.id)
                const comments = await Comment.find({s_id:decodedtoken.id}).populate("c_id")
                const flag = "sp"
                const [onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg] = await ratingStats(decodedtoken.id)
                const defaultTopProvider = await ServiceProvider.findByIdAndUpdate(decodedtoken.id,{rating:dpAvg},{runValidators:true})
                res.render("service_provider",{user:serviceProvider, flag,comments,onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg})
              
            }

            else if(decodedtoken.id === id){
                const serviceProvider = await ServiceProvider.findById(id)
                const comments = await Comment.find({s_id:id}).populate("c_id")
                const flag = "sp"
                const [onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg] = await ratingStats(id)
                const defaultTopProvider = await ServiceProvider.findByIdAndUpdate(id,{rating:dpAvg},{runValidators:true})
                res.render("service_provider",{
                    user:serviceProvider, flag,
                    comments,
                    onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg
                })
                
            }
            else{
                const serviceProvider = await ServiceProvider.findById(id)
                const comments = await Comment.find({s_id:id}).populate("c_id")
                const flag = "cu"
                const [onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg] = await ratingStats(id)
                const defaultTopProvider = await ServiceProvider.findByIdAndUpdate(id,{rating:dpAvg},{runValidators:true})
                res.render("service_provider",{user:serviceProvider, flag,comments,onestarPr, twostarPr, threestarPr, fourstarPr, fivestarPr, totalRating, oneStar, twoStar, threeStar, fourStar, fiveStar, dpAvg})
            }
        }
    })
  
}



const ratingStats = async (id) => {
    try {
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
        console.log("error")
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

const providerSchedule = async (req,res) =>{
    const token = req.cookies.jwt
    jwt.verify(token, "ServiceProvider", async (error, decodedtoken)=>{
        if(error){
            console.log(error)
        }else{
            const id = decodedtoken.id
            const bookings = await Booking.find({s_id:id}).sort({date:-1}).populate("c_id")
            res.render("service_provider_schedule", {
                bookings:bookings
            })
        }
    })
}

const customerSchedule = async (req,res) =>{
    const token = req.cookies.jwt
    jwt.verify(token, "Customer", async (error, decodedtoken)=>{
        if(error){
            console.log(error)
        }else{
            const id = decodedtoken.id
            const bookings = await Booking.find({c_id:id}).sort({date:-1}).populate("s_id")
            res.render("customer_schedule", {
                bookings:bookings
            })
        }
    })
}

module.exports = {
    displayAdminLogin,
    displayStartup, displaySignupService, displaySignupCustomer, displayLoginService, displayLoginCustomer, 
    displayHome,search,  customerSchedule, booking, displayPending, viewRc, displayAdmin,renderProfile, providerSchedule
}