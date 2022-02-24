const User = require('../model/user');

async function getUser(mail,phone) {
    if(mail==null){
        const user =await User.findOne({phone:phone})
        return user
    }else if(phone==null){
        const user =await User.findOne({mail:mail})
        return user
    }
    return null
}

module.exports = getUser