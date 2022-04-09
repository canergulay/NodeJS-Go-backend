const registerUserAPI = require('./api/register_user_api')
const loginUserAPI = require('./api/login_user_api')
const {GetUserProfileAPI} = require( "./api/get_user_profile_api")
const SetUserNotificationTokenAPI = require("./api/set_fcm_token_api")
const AuthenticationMiddleVare = require("../../middlewares/authentication_middleware")

const express = require('express')
const router = express.Router()

////// - REGISTER ROUTES - \\\\\\
var registerUser = '/user/register'
var sendMail = '/user/sendmail'
var verifyCode = '/user/verify'

////// - LOGIN ROUTES - \\\\\\
var loginUser = '/user/login'

////// - GENERAl ROUTES - \\\\\\
var userGet = '/user/get'
var userFcmSet = '/user/fcm/set'

router.get(userGet,GetUserProfileAPI)
router.post(registerUser,registerUserAPI.registerUserWithCredentials)
router.post(sendMail,registerUserAPI.sendVerificationMail)
router.post(verifyCode,registerUserAPI.verifyCode)
router.post(loginUser,loginUserAPI.loginUser)
router.post(userFcmSet,AuthenticationMiddleVare,SetUserNotificationTokenAPI)


module.exports = router