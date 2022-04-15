const registerUserAPI = require('./api/register_user_api')
const loginUserAPI = require('./api/login_user_api')
const {GetUserProfileAPI} = require( "./api/get_user_profile_api")
const {DeleteUserAPI}=require("./api/delete_user_api")
const SetUserNotificationTokenAPI = require("./api/set_fcm_token_api")
const AuthenticationMiddleVare = require("../../middlewares/authentication_middleware")
const express = require('express')
const router = express.Router()

////// - REGISTER ROUTES - \\\\\\
const registerUser = '/user/register'
const sendMail = '/user/sendmail'
const verifyCode = '/user/verify'

////// - LOGIN ROUTES - \\\\\\
const loginUser = '/user/login'

////// - GENERAl ROUTES - \\\\\\
const userGet = '/user/get'
const userFcmSet = '/user/fcm/set'
const userDelete = '/user/delete'

router.get(userGet,GetUserProfileAPI)
router.post(registerUser,registerUserAPI.registerUserWithCredentials)
router.post(sendMail,registerUserAPI.sendVerificationMail)
router.post(verifyCode,registerUserAPI.verifyCode)
router.post(loginUser,loginUserAPI.loginUser)
router.post(userDelete,DeleteUserAPI)
router.post(userFcmSet,AuthenticationMiddleVare,SetUserNotificationTokenAPI)


module.exports = router