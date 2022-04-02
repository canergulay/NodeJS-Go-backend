const Message = require("../model/message");
const Conversation = require("../model/conversation");

const SaveMessage = (message) => {
  const messageToSave = new Message(message);
  return messageToSave.save();
};

const CreateConversation = (user1, user2) => {
  const conversation = new Conversation({ users: [user1, user2] });
  return conversation.save();
};


const GetMessages = (conversationid,lastMessageCreatedAt)=>{
  if(lastMessageCreatedAt){
    return Message.find({conversationId:conversationid,createdAt:{$lte:lastMessageCreatedAt}}).sort({createdAt:-1})
  }
  // WHICH MEANS THAT WE DONT HAVE ANY MESSAGE SENT BEFOREHAND, NO NEED FOR PAGINATION\
  return Message.find({conversationId:conversationid}).sort({createdAt:-1})
  ///// ----- BRIEF EXPLANATION ON PAGINATION STRUCTURE ----- \\\\\
  // THAT IS THE MOST STRAIGHTFORWARD PAGINATION LOGIC THAT CAN BE PUT FORWARD.
  // SKIP AND LIMIT IS BULLSHIT FOR INFINITE SCROLLS && LAZY LOADS.
  // PAGINATIONS DEPENDING ON DATETIME & TIMESTAMP LIMITATIONS ARE PROVEN TO BE FASTER IF YOU ARE LOOKIN FOR INFINITE SCROLL TYPE OF PAGINATION.
  // I MEAN, IF YOU ARE PAGINATING IN A SEQUENCE AND DEEPING DIVE ONE BY ONE, WHAT WE DO HERE IS MORE PERFORMANT.
  // HOWEVER, IF YOU DIRECTLY NEED TO GO X'TH PAGE WITHOUT A SEQUENCE, OFFSET PAGINATION WOULD BE BETTER WHERE YOU USE SKIP AND LIMIT.
  // ALL YOU HAVE TO DO IS DEFINE A ROBUST INDEX WHICH WE WILL DEFINE FOR CONVERSATIONID AND "createdAt" AS A COMPOUND INDEX.
}

const GetConversationsUserIn = (userid) => {
  const conversations = Conversation.find({ users: { $in: [userid] } })
    .sort({updatedAt:-1})
    .populate("users")
    .populate("lastMessage");

  return conversations;
};

const GetConversationById = (id) => {
  const conversation = Conversation.findById(id);
  return conversation;
};

const UpdateConversationLastMessage = (id, lastMessage) => {
  return Conversation.findByIdAndUpdate(id, { lastMessage });
};

const CheckIfConversationExist = (user1, user2) => {
  const conversations = Conversation.find({ users: { $all: [user1, user2] } });
  return conversations;
};

module.exports = {
  SaveMessage,
  CreateConversation,
  CheckIfConversationExist,
  GetConversationById,
  UpdateConversationLastMessage,
  GetConversationsUserIn,
  GetMessages,
};
