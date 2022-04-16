const User = require("../model/user")

const UploadAvatarDS = (userid,imagePath) =>{
    return User.findByIdAndUpdate(userid,{picture:imagePath})
} 

module.exports = {UploadAvatarDS}