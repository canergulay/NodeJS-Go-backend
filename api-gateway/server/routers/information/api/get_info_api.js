const {GetInfoRepositary} = require("../repositary/get_info_repositary")

const GetTermsOfUseAPI = (req,res)=>{
    res.send(GetInfoRepositary("/terms_of_use.txt"))
}

const GetPrivacyPolicy = (req,res)=>{
    res.send(GetInfoRepositary("/privacy_policy.txt"))
}

module.exports = {GetTermsOfUseAPI,GetPrivacyPolicy}