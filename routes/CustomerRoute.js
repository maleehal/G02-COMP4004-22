const express = require("express")
const  {customerSignIn , customerLogIn ,displayLogInPage,displaySignUpPage, createBooking,createComment} = require('../controllers/controller')

const router = express.Router()

router.route("/signup").post(customerSignIn).get(displaySignUpPage)
router.route("/login").post(customerLogIn).get(displayLogInPage)
router.route("/booking").post(createBooking)
router.route("/comment").post(createComment)




module.exports = router