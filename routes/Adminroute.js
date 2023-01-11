const express = require("express")
const ServiceProvider = require("../models/service-provider")
const { rejectProvider ,getCounts , verifyProvider , getPendingProviders, getServiceProviderVerified } = require('../controllers/adminController')

const router = express.Router()

router.route('/getallpendingproviders').get(getPendingProviders)
router.route('/getallVerifiedproviders').get(getServiceProviderVerified)
router.route('/verify').patch(verifyProvider);
router.route('/reject').patch(rejectProvider);
router.route('/totalValue').get(getCounts);


module.exports = router