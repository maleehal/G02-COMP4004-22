const express = require("express")
const  {displayProviderProfile, updateProviderDetails,displayProviderSchedule} = require('../controllers/viewController.js')

const router = express.Router()

router.route("/service_provider/:id").get(displayProviderProfile).patch(updateProviderDetails)
router.route("/service_provider_schedule/:id").get(displayProviderSchedule)

module.exports = router