const loginUserRepositary = require('../repositary/login_user_repositary')


async function loginUser(req,res){
    let mail = req.body.mail
    let password = req.body.password
    let phone = req.body.phone
      return await loginUserRepositary.loginUser(mail,phone,password)
}


module.exports = {loginUser}