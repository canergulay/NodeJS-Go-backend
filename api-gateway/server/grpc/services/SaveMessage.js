
const {SaveMessageRepositary,CheckIfConversationExistAndSaveMessage} = require('../../routers/chat/repositary/chat_repositary')
const {Logger} = require("../../utils/log_manager")
const SendNotificationToUser = require("../../utils/firebase_fcm_helper")
const {FindUserById} = require ("../../routers/user/datasource/find_user_by_id")
const SaveMessage = (Message,callback)=>{

    const message = Message.request
    handleNotificationService(message)
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

const handleNotificationService = async (msg)=>{
    
    console.log(msg)
    if(msg.notify){
        const {message,receiver} = msg
        console.log('fcm triggered')
        let user = await FindUserById(receiver)
        let {fcm} = user
        try{
            console.log(fcm)
            let falan = await SendNotificationToUser([fcm],message)
            console.log(falan)
        }catch(e){
            Logger(e,"an unexpected error has occured when sending fcm notification to userid", fcm,receiver)
            console.log(e)
        }
    }
}

module.exports = SaveMessage