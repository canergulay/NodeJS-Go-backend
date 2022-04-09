const User = require("../model/user")


const SetUserNotificationToken = (userid,token) => {
    return User.findByIdAndUpdate(userid,{fcm:token})
}

module.exports = {SetUserNotificationToken}