const User = require("../model/user")

const DeleteUser=(userid)=>{

    const changeObject = {
        username:"deleted user",
        password:"deleted user",
        email:"",
        phone:""
    }
    return User.findByIdAndUpdate(userid,changeObject)
}

module.exports = {DeleteUser}