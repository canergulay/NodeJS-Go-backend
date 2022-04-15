const {GetInfoFromLocaleJson,ContactUs} = require("../datasource/get_info_ds")
const responser = require("../../../utils/response_wrapper")
const {Logger} = require('../../../utils/log_manager')

const GetInfoRepositary = (docName)=>{
    try{
        const data =GetInfoFromLocaleJson(docName)
        return responser(0,jsonWrapper( data.toString()))
    }catch(e){
        Logger("an unexpected error has occured when loading info of docName ",docName , "with error ",e)
        return responser(1,e)
    }   
}

const ContactUsRepositary = (userid,message)=>{
    try{
        return ContactUs(userid,message).then(contact=>{
            return responser(0,{})
        })
    }catch(e){
        Logger("an unexpected error has occured when user with userid ",userid,"trying to contact us with the message",message)
        return responser(1,e)

    }
}

function jsonWrapper(info){
    return {info:info}   
   }

module.exports = {GetInfoRepositary,ContactUsRepositary}