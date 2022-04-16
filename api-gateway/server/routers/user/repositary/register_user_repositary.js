const User = require('../model/user');
const registerUserDS = require('../datasource/register_user');
const hasher = require('../../../utils/hasher')
const response = require('../../../utils/response_wrapper')
const GetUser = require('../datasource/get_user')

async function registerUserRepositary(body) {
    try {
        // CHECK USER BEFORE REGISTRATION.
        let bodyChecked =  inputCheck(body)
        const {email,phone} = bodyChecked
        
        let userExists = await GetUser(email,phone)

        
        if(userExists){
            console.log("userExists")
            console.log(userExists)
            return response(2,"already_registered") 
        }
 
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