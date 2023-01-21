const express = require("express")

const { rejectProvider ,getCounts , verifyProvider , getPendingProviders, getServiceProviderVerified, 
    AdminLogIn, LogoutUser
} = require('../controllers/adminController')

const router = express.Router()


router.route('/getallpendingproviders').get(getPendingProviders)
router.route('/getallVerifiedproviders').get(getServiceProviderVerified)
router.route('/verify').patch(verifyProvider);
router.route('/reject').patch(rejectProvider);
router.route('/totalValue').get(getCounts);
router.route('/login').post(AdminLogIn);
router.route("/logout").get(LogoutUser)


module.exports = router