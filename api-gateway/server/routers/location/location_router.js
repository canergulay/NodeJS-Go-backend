const getLocation = require('./api/get_location')

const express = require('express')
const router = express.Router()

var apiSuffix = '/location'


router.post(apiSuffix,getLocation)


module.exports = router