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
  console.log(req.body)
  const { conversationId, lastCreated } = req.body;
  GetMessagesRepositary(conversationId, lastCreated).then(
    (messagesResponse) => {
       console.log(conversationId,lastCreated)
       console.log(messagesResponse)
      res.send(messagesResponse); 
    }
  ) // EROR IS HANDLED IN THE REPOSITARY LAYER.
}

module.exports = { GetUserConversationsAPI, GetMessagesAPI };
