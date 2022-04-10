const User = require('../model/user');

async function getUser(mail,phone) {
    console.log(mail,phone)
    if(mail==null || mail.length<5){
        const user =await User.findOne({phone:phone})
        return user
    }else {
        const user =await User.findOne({mail:mail})
        return user
    }
}

module.exports = getUser