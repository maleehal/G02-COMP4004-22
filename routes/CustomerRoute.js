const express = require("express")
const  {customerSignIn} = require('../controllers/controller')

const router = express.Router()

router.route("/signup").post(customerSignIn)


module.exports = router