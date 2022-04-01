const CheckUserConversationsRepositary = require("../repositary/chat_repositary")

const GetUserConversationsAPI = (req,res) => { 
   res.send(CheckUserConversationsRepositary(req.userid))
}

module.exports = {GetUserConversationsAPI}