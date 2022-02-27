const loginUserRepositary = require('../repositary/login_user_repositary')


async function loginUser(req,res){
    let mail = req.body.mail
    let password = req.body.password
    let phone = req.body.phone
    let response = await loginUserRepositary.loginUser(mail,phone,password)
    console.log(response)
       res.send(response)
}


module.exports = {loginUser}