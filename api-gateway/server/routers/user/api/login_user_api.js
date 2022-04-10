const loginUserRepositary = require('../repositary/login_user_repositary')


async function loginUser(req,res){
    console.log(req.body)
    let mail = req.body.email
    let password = req.body.password
    let phone = req.body.phone
    let response = await loginUserRepositary.loginUser(mail,phone,password)
    console.log(response)
       res.send(response)
}


module.exports = {loginUser}