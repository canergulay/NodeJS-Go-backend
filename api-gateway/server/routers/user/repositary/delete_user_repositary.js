const {DeleteUser} = require("../datasource/delete_user")
const responser = require("../../../utils/response_wrapper")
const {Logger} = require("../../../utils/log_manager")

const DeleteUserRepositary=userid=>{
    return DeleteUser(userid).then(userDeleted=>{
        return responser(0,{}) 
    }).catch(e=>{
        Logger("an error has occured when deleting the user with the id ",userid)
        return responser(e,{}) 

    })
}

module.exports={DeleteUserRepositary}