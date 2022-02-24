const Verification = require('../model/mail_auth')
const sendMail = require('../../../utils/mailer')

async function sendVerificationMail(mail){
    let code = generateCode()
    let verificationCode = Verification({mail:mail,code:code})
    await verificationCode.save()
    return sendMail(mail,code)
}

async function verifyCode(mail,code){
    let verificationCode = await Verification.findOne({'mail':mail,'code':code})
    if(verificationCode){
        return true
    }
    return false
}






function generateCode(){
    return Math.floor(100000 + Math.random() * 900000)
}


module.exports = {sendVerificationMail,verifyCode}