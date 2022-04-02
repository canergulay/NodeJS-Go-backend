const {
  CheckUserConversationsRepositary,
  GetMessagesRepositary,
} = require("../repositary/chat_repositary");

const GetUserConversationsAPI = (req, res) => {
  CheckUserConversationsRepositary(req.userid)
    .then((result) => {
      res.send(result)
    }) // EROR IS HANDLED IN THE REPOSITARY LAYER.
}

const GetMessagesAPI = (req, res) => {
  const { conversationId, lastMessageCreatedAt } = req.body;
  GetMessagesRepositary(conversationId, lastMessageCreatedAt).then(
    (messagesResponse) => {
      res.send(messagesResponse); 
    }
  ) // EROR IS HANDLED IN THE REPOSITARY LAYER.
}

module.exports = { GetUserConversationsAPI, GetMessagesAPI };
