const GetUserConversationsAPI = require("./api/check_user_conversations_api")


const express = require('express')
const router = express.Router()

var conversationsApiSuffix = '/chat/conversations'


router.get(conversationsApiSuffix,GetUserConversationsAPI)


module.exports = router