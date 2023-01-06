const ServiceProvider = require("../models/service-provider")
const Booking = require("../models/booking")

const displayProviderProfile = async (req,res) =>{
    const {id} = req.params
    const provider = await ServiceProvider.findOne({_id:id})
    res.render("service_provider", {
        provider:provider
    });
}

const updateProviderDetails = async (req,res)=>{
    const {descriptionData,aboutData} = req.body
    const {id} = req.params
    const Updateprovider = await ServiceProvider.findByIdAndUpdate(id,{description:descriptionData, about:aboutData},{runValidators:true})
};

const displayProviderSchedule = async (req,res)=>{
    const {id} = req.params
    const bookings = await Booking.find({s_id:id})
    res.render("service_provider_schedule", {
      bookings:bookings
    })
};

module.exports = {displayProviderProfile, updateProviderDetails, displayProviderSchedule}