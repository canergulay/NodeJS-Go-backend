const User = require('../model/user');
const registerUserDS = require('../datasource/register_user');
const hasher = require('../../../helpers/hasher')


async function registerUserRepositary(body) {
    try {
        let bodyChecked =  inputCheck(body)
        let user = await registerUserDS(bodyChecked)
        return User(user).generateToken()
    } catch (e) {
        return e
    }
}

module.exports = registerUserRepositary


 function inputCheck(userObject) {
    userObject.phone = userObject.phone.split(" ").join("") 
    userObject.password = hasher.hashGivenValue(userObject.password)
    return userObject
}