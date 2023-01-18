const express = require("express")

const {checkUser, serviceProviderAuth, customerAuth} = require("../middleware/middleware")

const  {
    displayStartup, displaySignupService, displayPending, displaySignupCustomer, displayLoginService, displayLoginCustomer, displayHome, search, 
    displayProviderProfile, displayProviderSchedule, displaypageToCustomer, customerSchedule, booking, viewRc, displayAdmin
} = require('../controllers/viewController.js')

const router = express.Router()

router.route("/startup").get(displayStartup)
router.route("/signup-service").get(displaySignupService)
router.route("/login-service").get(displayLoginService)
router.route("/pending").get(displayPending)
router.route("/signup-customer").get(displaySignupCustomer)
router.route("/login-customer").get(displayLoginCustomer)
router.route("/").get(checkUser,displayHome)
router.route("/search").get(checkUser,search)
router.route("/service_provider").get(checkUser,displayProviderProfile)
router.route("/service_provider_schedule").get(checkUser,serviceProviderAuth,displayProviderSchedule)
router.route("/rc/:id").get(viewRc)
router.route("/service_provider/:id").get(checkUser,displaypageToCustomer)
router.route("/booking/:id").get(checkUser,booking)
router.route("/customer_schedule").get(checkUser, customerAuth, customerSchedule)
router.route("/admin").get(displayAdmin)

module.exports = router