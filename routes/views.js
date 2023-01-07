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



router.route("/service_provider/:id").get(displayProviderProfile).patch(updateProviderDetails)
router.route("/service_provider_schedule/:id").get(displayProviderSchedule)
router.route("/search").get(displaySearchPage)

module.exports = router