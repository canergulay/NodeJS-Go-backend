const {GetUserConversationsAPI,GetMessagesAPI} = require("./api/check_user_conversations_api")


const express = require('express')
const router = express.Router()

const conversationsApiSuffix = '/chat/conversations'
const MessagesApiSuffix = '/chat/messages'


router.get(conversationsApiSuffix,GetUserConversationsAPI)
router.get(MessagesApiSuffix,GetMessagesAPI)


module.exports = router