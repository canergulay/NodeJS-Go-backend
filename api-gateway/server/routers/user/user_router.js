const registerUserAPI = require('./api/register_user_api')



const express = require('express')
const router = express.Router()

var registerApiSuffix = '/user/register'


router.post(registerApiSuffix,registerUserAPI)


module.exports = router