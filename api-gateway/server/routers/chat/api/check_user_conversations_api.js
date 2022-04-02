const {CheckUserConversationsRepositary} = require("../repositary/chat_repositary")
const responseWrapper = require("../../../utils/response_wrapper")
const {Logger} = require("../../../utils/log_manager")
const GetUserConversationsAPI = (req,res) => {
   CheckUserConversationsRepositary(req.userid).then(result=>{
      res.send(results)
   }).catch(e => {
      Logger(e," An unexpected error has happened when getting results from CheckUserConversationsRepositary")
      res.send(responseWrapper(1,e))
   })
}

module.exports = {GetUserConversationsAPI}