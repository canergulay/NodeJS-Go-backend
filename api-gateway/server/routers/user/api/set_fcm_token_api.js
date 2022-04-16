const SetUserNotificationTokenRepositary = require("../repositary/set_user_notification_repositary")


const SetUserNotificationTokenAPI = (req,res)=>{
    const {fcmToken} = req.body
    const {userid} = req
    console.log(userid,"userid")
    console.log(fcmToken,"fcm")
    SetUserNotificationTokenRepositary(userid,fcmToken).then(response=>{
        res.send(response)
    })
}

module.exports=SetUserNotificationTokenAPI