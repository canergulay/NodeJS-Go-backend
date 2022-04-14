const {GetInfoFromLocaleJson} = require("../datasource/get_info_ds")
const responser = require("../../../utils/response_wrapper")
const {Logger} = require('../../../utils/log_manager')
const GetInfoRepositary = (docName)=>{
    try{
        const data =GetInfoFromLocaleJson(docName)
        return responser(0,data.toString())
    }catch(e){
        Logger("an unexpected error has occured when loading info of docName ",docName , "with error ",e)
        return responser(1,e)
    }   
}

module.exports = {GetInfoRepositary}