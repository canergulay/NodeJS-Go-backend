
const express = require('express')
const router = express.Router()
const {GetPrivacyPolicy,GetTermsOfUseAPI,ContactUsAPI} = require("./api/get_info_api")

const termsOfuserApiSuffix = '/termsofuse'
const privacyPolicyApiSuffix = '/privacypolicy'
const contactUsApiSuffix = "/contactus"

router.get(termsOfuserApiSuffix,GetTermsOfUseAPI)
router.get(privacyPolicyApiSuffix,GetPrivacyPolicy)
router.post(contactUsApiSuffix,ContactUsAPI)


module.exports = router