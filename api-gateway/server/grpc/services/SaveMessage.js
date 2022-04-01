
const {SaveMessageRepositary,CheckIfConversationExistAndSaveMessage} = require('../../routers/chat/repositary/chat_repositary')

const SaveMessage = (Message,callback)=>{
    console.log(Message.request)
    const message = Message.request

    callback(null,{isOkey:true})
    if(message.conversationId == null || message.conversationId.length <=1 ){
        console.log("evet conversation bos, ilk once conversationu olusturacagiz")
        CheckIfConversationExistAndSaveMessage(message)
    }else{
        console.log("yoo conversation ortada !")
        SaveMessageRepositary(message)
    }
}

module.exports = SaveMessage