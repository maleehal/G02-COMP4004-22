const express = require("express")
const ServiceProvider = require("../models/service-provider")
const Booking = require("../models/booking")
const {checkUser, serviceProviderAuth} = require("../middleware/middleware")
const {
    getAllproviders , displayLogInPage ,displaySignUpPage ,signUpService, serviceLogIn, 
    updateProviderDetails, acceptAppoinments, rejectAppoinments, completedAppoinments, getBuisnessPerformance, 
    displayProviderProfile
} = require('../controllers/serviceController')
 
const router = express.Router()

router.route("/signup").get(displaySignUpPage).post(signUpService)
router.route("/login").get(displayLogInPage).post(serviceLogIn)
router.route("/getallproviders").get(getAllproviders)
router.route("/updateProviderDetails").patch(updateProviderDetails)
router.route("/acceptAppoinments").patch(acceptAppoinments)
router.route("/rejectAppoinments").patch(rejectAppoinments)
router.route("/completedAppoinments").patch(completedAppoinments)
router.route("/getBuisnessPerformance").get(getBuisnessPerformance)
router.route("/get").get(getBuisnessPerformance)
router.route("/getProviderComments").get(displayProviderProfile)



module.exports = router