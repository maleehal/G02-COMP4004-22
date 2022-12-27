const express = require("express")
const  {getAllproviders , displayLogInPage ,displaySignUpPage ,signUpService, serviceLogIn} = require('../controllers/serviceController')

const router = express.Router()

router.route("/signup").get(displaySignUpPage).post(signUpService)
router.route("/login").get(displayLogInPage).post(serviceLogIn)
router.route("/getallproviders").get(getAllproviders)



module.exports = router