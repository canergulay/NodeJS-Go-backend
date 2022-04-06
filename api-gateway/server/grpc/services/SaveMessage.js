
const {SaveMessageRepositary,CheckIfConversationExistAndSaveMessage} = require('../../routers/chat/repositary/chat_repositary')
const {Logger} = require("../../utils/log_manager")

const SaveMessage = (Message,callback)=>{

    const message = Message.request
    console.log(message,"mesja geldi !!")
    if(message.conversationId){  
        callback(null,{isOkey:true,conversationId:message.conversationId})
        handleMessagePersisting(message)
    }else{
        handleMessagePersisting(message).then(conversationId=>{
            callback(null,{isOkey:true,conversationId:conversationId})
        }).catch(e=>{
            callback(null,{isOkey:true,conversationId:''})
            Logger(e,"Unexpected error when getting conversation id of a rpc message that doesn't have it's own.")
        })
    }
}


const handleMessagePersisting = async (message) => {
    try{
        if(message.conversationId == null || message.conversationId.length <=1 ){
        return await CheckIfConversationExistAndSaveMessage(message)
        }else{
        SaveMessageRepositary(message)
        }
    }catch(e){
        Logger(e,"Unexpected error when handling save massage rpc call from the chat service")
    }
}

module.exports = SaveMessage