const response = require('../../../utils/response_wrapper')
const mailVerificationDS = require('../datasource/verification_mail')
const Hasher = require('../../../utils/hasher')


async function sendMailVerification(mail){
    try{
        let success = await mailVerificationDS.sendVerificationMail(mail)
        console.log(success)
        return response(0,{'isSent':true})
    }catch(e){
        console.log(e)
        return response(1,e)
    }
}

async function verifyCode(mail,code){
    try{
        let isCodeMatched = await mailVerificationDS.verifyCode(mail,code)
        return response(0,{'isVerified':isCodeMatched})
    }catch(e){
        return response(1,false)
    }
}

module.exports = {sendMailVerification,verifyCode}