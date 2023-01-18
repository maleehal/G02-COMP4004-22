const express = require("express")
const ServiceProvider = require("../models/service-provider")
const Booking = require("../models/booking")
const {checkUser, serviceProviderAuth} = require("../middleware/middleware")
const {
<<<<<<< HEAD
    getAllproviders ,signUpService, serviceLogIn, 
    updateProviderDetails, acceptAppoinments, rejectAppoinments, completedAppoinments, getBuisnessPerformance
=======
    getAllproviders , displayLogInPage ,displaySignUpPage ,signUpService, serviceLogIn, 
    updateProviderDetails, acceptAppoinments, rejectAppoinments, completedAppoinments, getBuisnessPerformance, 
    displayProviderProfile
>>>>>>> 48f4559b3d768944add8e8ce81487a418e875c12
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
<<<<<<< HEAD
=======
router.route("/get").get(getBuisnessPerformance)
router.route("/getProviderComments").get(displayProviderProfile)

>>>>>>> 48f4559b3d768944add8e8ce81487a418e875c12


module.exports = router