const express = require("express")
const  customerSignIn = require('../controllers/controller')

const router = express.Router()

router.route("/signup",customerSignIn)


module.exports = router