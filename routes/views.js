const express = require("express")
const {checkUser} = require("../middleware/middleware")

const  {displayProviderProfile,
        updateProviderDetails,
        displayProviderSchedule ,
        displayBookingPage ,
        displayCustomerSchedulePage ,
        displaySearchPage ,
        displayHomePage} = require('../controllers/viewController.js')

const router = express.Router()

router.route("/service-provider/:id").get(displayProviderProfile).patch(updateProviderDetails)
router.route("/service_provider_schedule/:id").get(checkUser,displayProviderSchedule)
router.route("/booking").get(displayBookingPage)
router.route("/customer_schedule").get(displayCustomerSchedulePage)
router.route("/search").get(displaySearchPage)
router.route("/").get(displayHomePage)



module.exports = router