const {UploadAvatarRepositary} = require("../repositary/upload_avatar_repositary") 

const UploadUserPicture = (req,res)=>{
    const {userid} = req
    const {imagePath} = req.body

    UploadAvatarRepositary(userid,imagePath).then(response=>{
        res.send(response)
    })
}

module.exports = {UploadUserPicture}