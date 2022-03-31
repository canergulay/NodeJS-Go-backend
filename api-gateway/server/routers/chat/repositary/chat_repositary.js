const {
  SaveMessage,
  CreateConversation,
  CheckIfConversationExist,
  GetConversationById,
  UpdateConversationLastMessage,
} = require("../datasource/chat_datasource");

const SaveMessageRepositary = (message) => {
  SaveMessage(message)
    .then((saved) => {
      const conversationId = { message };
      return UpdateConversationLastMessage(conversationId, saved.id);
    })
    .then((conversationUpdated) => {
      return true;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });
};

const CheckIfConversationExistAndSaveMessage = (message) => {

  CheckIfConversationExist(message.sender,message.receiver).then(conversations=>{
   if(conversations.length>=1){
     let conversation = conversations[0]
     message.conversationId = conversation.id
     SaveMessage(message).then(savedMessage=>{
       console.log("message saved")
       console.log(savedMessage)
     })
   }else{
     CreateConversation(message.sender,message.receiver).then(conversationCreated=>{
      message.conversationId = conversationCreated.id
      SaveMessage(message).then(savedMessage=>{
        console.log("conversation created and the message saved !! ")
        console.log(savedMessage)
      })
     })
   }
  })
 


    
    // return CreateConversation(message.sender, message.receiver)
    //   .then((conversation) => {
    //     console.log("POINT 3");

    //     return SaveMessageRepositary({
    //       ...message,
    //     });
    //   })
    //   .then((messagesaved) => {
    //     console.log("POINT 4 ");

    //     console.log(messagesaved, " SAVED !");
    //   })
    //   .catch((e) => {
    //     console.log("POINT 5 ");

    //     console.log(e);
    //   });
 
    //SaveMessageRepositary(message);
  
};

module.exports = {
  SaveMessageRepositary,
  CheckIfConversationExistAndSaveMessage,
};
