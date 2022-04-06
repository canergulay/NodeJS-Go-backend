const {GetUserConversationsAPI,GetMessagesAPI} = require("./api/check_user_conversations_api")


const express = require('express')
const router = express.Router()

const conversationsApiSuffix = '/chat/conversations'
const messagesApiSuffix = '/chat/messages'

router.post(messagesApiSuffix,GetMessagesAPI)
router.get(conversationsApiSuffix,GetUserConversationsAPI)


module.exports = router