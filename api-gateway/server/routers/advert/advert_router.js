const getCategoriesAPI = require('./api/get_categories_api')

const express = require('express')
const router = express.Router()

////// - CATEGORY ROUTES - \\\\\\
var categories = '/categories'


router.post(categories,getCategoriesAPI.getCategories)



module.exports = router