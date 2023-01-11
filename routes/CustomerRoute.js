const express = require("express")

const  {customerSignIn , customerLogIn ,LogoutUser, createBooking,createComment} = require('../controllers/controller')

const router = express.Router()

router.route("/signup").post(customerSignIn)
router.route("/login").post(customerLogIn)
router.route("/logout").get(LogoutUser)
router.route("/booking").post(createBooking)
router.route("/comment").post(createComment)





module.exports = router