const express = require("express")
const  {customerSignIn , customerLogIn ,displayLogInPage,displaySignUpPage, SearchProvider} = require('../controllers/controller')

const router = express.Router()

router.route("/signup").post(customerSignIn).get(displaySignUpPage)
router.route("/login").post(customerLogIn).get(displayLogInPage)
router.route("/search").get((req,res) =>{
    res.render("search")

})




module.exports = router