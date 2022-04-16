const {GetUserConversationsAPI,GetMessagesAPI} = require("./api/check_user_conversations_api")
const AuthenticationMiddleVare = require("../../middlewares/authentication_middleware")

const express = require('express')
const router = express.Router()

const conversationsApiSuffix = '/chat/conversations'
const messagesApiSuffix = '/chat/messages'

router.post(messagesApiSuffix,AuthenticationMiddleVare,GetMessagesAPI)
router.get(conversationsApiSuffix,AuthenticationMiddleVare,GetUserConversationsAPI)


module.exports = router