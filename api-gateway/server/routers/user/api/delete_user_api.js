const {DeleteUserRepositary} = require("../repositary/delete_user_repositary")

const DeleteUserAPI=(req,res)=>{
    const userid = req.userid
    DeleteUserRepositary(userid).then(response=>{
        res.send(response)
    })
}

module.exports = {DeleteUserAPI}