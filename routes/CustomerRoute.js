const express = require("express")
const  {customerSignIn , customerLogIn ,customerLogOut} = require('../controllers/controller')

const router = express.Router()

router.route("/signup").post(customerSignIn)
router.route("/login").post(customerLogIn).get(customerLogOut)



module.exports = router