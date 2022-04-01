
const {SaveMessageRepositary,CheckIfConversationExistAndSaveMessage} = require('../../routers/chat/repositary/chat_repositary')
const {Logger} = require("../../utils/log_manager")

const SaveMessage = (Message,callback)=>{

    const message = Message.request

    callback(null,{isOkey:true})
    handleMessagePersisting(message)
}


const handleMessagePersisting = (message) => {
    try{
        if(message.conversationId == null || message.conversationId.length <=1 ){
            CheckIfConversationExistAndSaveMessage(message)
        }else{
            SaveMessageRepositary(message)
        }
    }catch(e){
        Logger(e,"Unexpected error when handling save massage rpc call from the chat service")
    }
}

module.exports = SaveMessage