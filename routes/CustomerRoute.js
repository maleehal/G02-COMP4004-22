const express = require("express")
const  {customerSignIn , customerLogIn ,LogoutUser} = require('../controllers/controller')

const router = express.Router()

router.route("/signup").post(customerSignIn)
router.route("/login").post(customerLogIn)
router.route("/logout").get(LogoutUser)



module.exports = router