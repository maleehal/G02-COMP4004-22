const express = require("express")
const ServiceProvider = require("../models/service-provider")
const Booking = require("../models/booking")
const {checkUser, serviceProviderAuth} = require("../middleware/middleware")
const {
    getAllproviders ,signUpService, serviceLogIn, 
    updateProviderDetails, acceptAppoinments, rejectAppoinments, completedAppoinments, getBuisnessPerformance

} = require('../controllers/serviceController')
 
const router = express.Router()

router.route("/signup").post(signUpService)
router.route("/login").post(serviceLogIn)
router.route("/getallproviders").get(getAllproviders)
router.route("/updateProviderDetails").patch(updateProviderDetails)
router.route("/acceptAppoinments").patch(acceptAppoinments)
router.route("/rejectAppoinments").patch(rejectAppoinments)
router.route("/completedAppoinments").patch(completedAppoinments)
router.route("/getBuisnessPerformance").get(getBuisnessPerformance)


module.exports = router