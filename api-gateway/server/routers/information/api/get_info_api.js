const {GetInfoRepositary,ContactUsRepositary} = require("../repositary/get_info_repositary")

const GetTermsOfUseAPI = (req,res)=>{
    res.send(GetInfoRepositary("/terms_of_use.txt"))
}

const GetPrivacyPolicy = (req,res)=>{
    res.send(GetInfoRepositary("/privacy_policy.txt"))
}

const ContactUsAPI = (req,res)=>{
    let {message} = req.body
    let userid = req.userid
    ContactUsRepositary(userid,message).then(response=>{
        res.send(response)
    })
}

module.exports = {GetTermsOfUseAPI,GetPrivacyPolicy,ContactUsAPI}