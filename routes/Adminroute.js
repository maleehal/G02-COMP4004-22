const express = require("express")
const  {customerSignIn , customerLogIn ,displayLogInPage,displaySignUpPage} = require('../controllers/controller')

const router = express.Router()

router.route("/").get((req,res) =>[
    console.log("hey")
])





module.exports = router