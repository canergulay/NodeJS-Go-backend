const getCategoriesAPI = require('./api/get_categories_api')
const advertAPI = require('../advert/api/advert_api')

const express = require('express')
const router = express.Router()

////// - CATEGORY ROUTES - \\\\\\
var categories = '/categories'
var advertSave = '/advert/save'

router.post(categories,getCategoriesAPI.getCategories)
router.post(advertSave,advertAPI.saveAdvertAPI)



module.exports = router