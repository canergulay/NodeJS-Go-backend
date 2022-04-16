const User = require('../model/user');

async function getUser(email,phone) {
    if(email==null || email.length<5){
        return await User.findOne({phone:phone})
    }else {
        return await User.findOne({email:email})
    }
}

module.exports = getUser