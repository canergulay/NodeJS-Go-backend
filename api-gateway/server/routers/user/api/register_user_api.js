const registerUserRepositary = require('../repositary/register_user_repositary')
const sendMailRepositary = require('../repositary/mail_verification')

async function registerUserWithCredentials(req,res){
    let userCredentials = req.body
    let registeredUser = await registerUserRepositary(userCredentials)
    res.send(registeredUser) 
}


async function sendVerificationMail(req,res){
    let mail = req.body.mail
    let response = await sendMailRepositary.sendMailVerification(mail)
    res.send(response)
}

async function verifyCode(req,res){
    let mail = req.body.mail
    let code = req.body.code
    let response = await sendMailRepositary.verifyCode(mail,code)
    res.send(response)
}   


module.exports = {registerUserWithCredentials,sendVerificationMail,verifyCode}