const loginUserDS = require('../datasource/get_user')
const Hasher = require('../../../utils/hasher')
const response = require('../../../utils/response_wrapper')

async function loginUser(mail,phone,password) {

    try{

    let user = await loginUserDS(mail,phone)

    if(user==null){
        return response(5,userWithToken)
    }

    let isPasswordsMatch = Hasher.compareGivenHashAndValue(user.password,password)
    let userWithToken = await user.generateToken()
    if(isPasswordsMatch){
        return response(1,userWithToken)
    }else{
        return response(4,userWithToken)
    }

    }catch(e){
        return response(1,e)

    }
}

module.exports = {loginUser}