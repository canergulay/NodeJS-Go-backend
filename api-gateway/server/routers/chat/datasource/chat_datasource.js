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

const GetConversationsUserIn = (userid) => {
  const conversations = Conversation.find({ users: { $in: [userid] } })
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
};
