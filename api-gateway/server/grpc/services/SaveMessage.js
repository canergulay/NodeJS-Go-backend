
const {SaveMessageRepositary,CheckIfConversationExistAndSaveMessage} = require('../../routers/chat/repositary/chat_repositary')

const SaveMessage = (Message,callback)=>{
    console.log(Message.request)
    CheckIfConversationExistAndSaveMessage(Message.request)
    callback(null,{isOkey:true})
}

module.exports = SaveMessage