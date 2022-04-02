
const responseWrapper = require("../../../utils/response_wrapper");

const {
  SaveMessage,
  CreateConversation,
  CheckIfConversationExist,
  GetConversationById,
  UpdateConversationLastMessage,
  GetConversationsUserIn
} = require("../datasource/chat_datasource");

const CheckUserConversationsRepositary = userid =>{
 return GetConversationsUserIn(userid).then(conversations=>{
    return responseWrapper(0,conversations)
  }).catch(e=>{
    return responseWrapper(1,e)
  })
}

const SaveMessageRepositary = (message) => {
  SaveMessage(message)
    .then((saved) => {
      const { conversationId } = message;
      return UpdateConversationLastMessage(conversationId, saved.id);
    })
    .then((conversationUpdated) => {
      console.log(conversationUpdated);
      return true;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });
};

const CheckIfConversationExistAndSaveMessage = (message) => {
  CheckIfConversationExist(message.sender, message.receiver).then(
    (conversations) => {
      const doesConversationExist = conversations.length >= 1;
      if (doesConversationExist) {
        let conversation = conversations[0];
        message.conversationId = conversation.id;
        SaveMessageRepositary(message);
      } else {
        CreateConversation(message.sender, message.receiver).then(
          (conversationCreated) => {
            message.conversationId = conversationCreated.id;
            SaveMessageRepositary(message);
          }
        );
      }
    }
  );
};

module.exports = {
  SaveMessageRepositary,
  CheckIfConversationExistAndSaveMessage,
  CheckUserConversationsRepositary,
};
