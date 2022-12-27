const express = require("express")
const  {customerSignIn , customerLogIn ,displayLogInPage,displaySignUpPage} = require('../controllers/controller')

const router = express.Router()

router.route("/signup").post(customerSignIn).get(displaySignUpPage)
router.route("/login").post(customerLogIn).get(displayLogInPage)



module.exports = router