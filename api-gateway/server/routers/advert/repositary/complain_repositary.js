const {ComplainDataSource} = require("../datasource/complain_datasource.js")
const responser = require("../../../utils/response_wrapper")

const ComplainRepositary = complain=> {
    return ComplainDataSource(complain.complainant,complain.message,complain.target).then(complaint=>{
        return responser(0,{})
    }).catch(e=>{
        return responser(1,{})
    })
}

module.exports = {ComplainRepositary}