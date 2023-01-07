const express = require("express")

const {checkUser, serviceProviderAuth} = require("../middleware/middleware")
const  {displayProviderProfile, displayProviderSchedule} = require('../controllers/viewController.js')

const router = express.Router()

router.route("/service_provider").get(checkUser ,displayProviderProfile)
router.route("/service_provider_schedule").get(serviceProviderAuth,displayProviderSchedule)


module.exports = router