const express = require("express")

const {checkUser, serviceProviderAuth, customerAuth} = require("../middleware/middleware")
const  {
    displayStartup, displaySignupService, displayPending, displaySignupCustomer, displayLoginService, displayLoginCustomer, displayHome, search, 
    displayProviderProfile, displayProviderSchedule, displaypageToCustomer, customerSchedule, booking, displayAdmin, viewRc
} = require('../controllers/viewController.js')

const router = express.Router()

router.route("/startup").get(displayStartup)
router.route("/signup-service").get(displayServiceSignUp)
router.route("/login-service").get(displayServiceLogin)
router.route("/pending").get(displayPending)
router.route("/signup-customer").get(displayCustomerSignUp)
router.route("/login-customer").get(displayCustomerLogin)
router.route("/").get(checkUser,displayHome)
router.route("/search").get(checkUser,search)
router.route("/service_provider").get(checkUser,displayProviderProfile)
router.route("/service_provider_schedule").get(checkUser,serviceProviderAuth,displayProviderSchedule)
router.route("/rc/:id").get(viewRc)
router.route("/service_provider/:id").get(checkUser,displaypageToCustomer)
router.route("/booking/:id").get(checkUser,booking)
router.route("/customer_schedule").get(checkUser, customerAuth, customerSchedule)

module.exports = router