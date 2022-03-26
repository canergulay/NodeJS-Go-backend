const getCategoriesAPI = require('./api/get_categories_api')
const advertAPI = require('../advert/api/advert_api')

const express = require('express')
const router = express.Router()

////// - MIDDLEWARES - \\\\\\
const AuthenticationMiddleVare = require('../../middlewares/authentication_middleware')

router.use(AuthenticationMiddleVare)

////// - CATEGORY ROUTES - \\\\\\
var categories = '/categories'
var advertSave = '/advert/save'
var advertGet = '/advert/get'

router.post(categories,AuthenticationMiddleVare,getCategoriesAPI.getCategories)
router.post(advertSave,advertAPI.saveAdvertAPI)
router.get(advertGet,advertAPI.getAdvertsAPI)



module.exports = router