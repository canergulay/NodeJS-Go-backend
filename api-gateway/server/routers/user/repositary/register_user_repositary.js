const User = require('../model/user');
const registerUserDS = require('../datasource/register_user');
const hasher = require('../../../utils/hasher')
const response = require('../../../utils/response_wrapper')

async function registerUserRepositary(body) {
    try {
        let bodyChecked =  inputCheck(body)
        let user = await registerUserDS(bodyChecked)
        let userWithToken = await User(user).generateToken()
        return response(0,userWithToken)
    } catch (e) {
        console.log(e)
        if(e.code == 11000){
            return response(2,e) // CHECK IF USER IS ALREADY REGISTERED
        }
        return response(1,e) // UNKNOWN ERROR, SHOULD BE LOGGED AND INVESTIGATED LATER ON
    }
}

module.exports = registerUserRepositary


 function inputCheck(userObject) {
    if(userObject.phone != null){
        userObject.phone = userObject.phone.split(" ").join("")
    }
    userObject.password = hasher.hashGivenValue(userObject.password)
    return userObject
}