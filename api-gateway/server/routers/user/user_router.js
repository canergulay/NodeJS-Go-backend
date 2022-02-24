const registerUserAPI = require('./api/register_user_api')
const loginUserAPI = require('./api/login_user_api')

const express = require('express')
const router = express.Router()

////// - REGISTER ROUTES - \\\\\\
var registerUser = '/user/register'
var sendMail = '/user/sendmail'
var verifyCode = '/user/verify'

////// - LOGIN ROUTES - \\\\\\
var loginUser = '/user/login'

router.post(registerUser,registerUserAPI.registerUserWithCredentials)
router.post(sendMail,registerUserAPI.sendVerificationMail)
router.post(verifyCode,registerUserAPI.verifyCode)
router.post(loginUser,loginUserAPI.loginUser)


module.exports = router