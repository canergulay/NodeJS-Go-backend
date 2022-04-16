const {SetUserNotificationToken} = require("../datasource/set_notification_token")
const responser = require("../../../utils/response_wrapper")
const {Logger} = require("../../../utils/log_manager")

const SetUserNotificationTokenRepositary = (userid,token)=>{
    return SetUserNotificationToken(userid,token).then(userSaved=>{
        return responser(0,{})
    }).catch(e=>{
        Logger(e,"an unexpected error has occured when setting token for userid --> ",userid,token)
        return responser(1,{})
    })
}

module.exports = SetUserNotificationTokenRepositary
