const express = require("express")
const ServiceProvider = require("../models/service-provider")
const {checkUser, serviceProviderAuth} = require("../middleware/middleware")
const {getAllproviders , displayLogInPage ,displaySignUpPage ,signUpService, serviceLogIn, updateProviderDetails, acceptAppoinments, rejectAppoinments} = require('../controllers/serviceController')

const displaypage = async (req,res) =>{
    const {id} = req.params
    const serviceProvider = await ServiceProvider.findById(id)
    const flag = "cu"
    res.render("service_provider",{user:serviceProvider,flag})
}

const router = express.Router()

router.route("/signup").get(displaySignUpPage).post(signUpService)
router.route("/login").get(displayLogInPage).post(serviceLogIn)
router.route("/getallproviders").get(getAllproviders)
router.route("/updateProviderDetails").patch(updateProviderDetails)
router.route("/acceptAppoinments").patch(acceptAppoinments)
router.route("/rejectAppoinments").patch(rejectAppoinments)
router.route("/service_provider/:id").get(displaypage)




module.exports = router