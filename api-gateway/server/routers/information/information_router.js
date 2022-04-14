
const express = require('express')
const router = express.Router()
const {GetPrivacyPolicy,GetTermsOfUseAPI} = require("./api/get_info_api")

const termsOfuserApiSuffix = '/termsofuse'
const privacyPolicyApiSuffix = '/privacypolicy'


router.get(termsOfuserApiSuffix,GetTermsOfUseAPI)
router.get(privacyPolicyApiSuffix,GetPrivacyPolicy)


module.exports = router