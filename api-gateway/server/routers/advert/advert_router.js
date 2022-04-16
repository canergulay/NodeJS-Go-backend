const getCategoriesAPI = require('./api/get_categories_api')
const advertAPI = require('../advert/api/advert_api')
const {ComplaintAPI} = require("./api/complaint_api")
const {DeleteUserAPI} = require("../user/api/delete_user_api")
const express = require('express')
const router = express.Router()

////// - MIDDLEWARES - \\\\\\
const AuthenticationMiddleVare = require('../../middlewares/authentication_middleware')



////// - CATEGORY ROUTES - \\\\\\
const categories = '/categories'
const advertSave = '/advert/save'
const advertGet = '/advert/get'
const advertMyGet = '/advert/get/my'
const advertDelete = "/advert/delete"
const complaint = "/complain"

// THIS ROUTE HAS AUTHENTICATION MIDDLEWARE AND I NEED TO LOCATE USERDELETEAPI HERE FOR SOME REASONS OUT OF CONTEXT \\ 


router.post(categories,AuthenticationMiddleVare,getCategoriesAPI.getCategories)
router.post(advertSave,AuthenticationMiddleVare,advertAPI.saveAdvertAPI)
router.post(advertGet,advertAPI.getAdvertsAPI)
router.get(advertMyGet,AuthenticationMiddleVare,advertAPI.getMyAdvertsAPI)

router.post(advertDelete,AuthenticationMiddleVare,advertAPI.deleteMyAdvertAPI)
router.post(complaint,AuthenticationMiddleVare,ComplaintAPI)



module.exports = router