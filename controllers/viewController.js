const ServiceProvider = require("../models/service-provider")
const Booking = require("../models/booking")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")


// const displayProviderProfile = async (req,res) =>{
//     const {id} = req.params
//     const provider = await ServiceProvider.findOne({_id:id})
//     res.render("service_provider", {
//         provider:provider
//     });
// }

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

module.exports = {displayProviderProfile, displayProviderSchedule}

