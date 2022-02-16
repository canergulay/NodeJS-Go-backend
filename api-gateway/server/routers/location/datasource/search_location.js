const axios = require('axios')
const endpoints = require('../../../helpers/endpoints')


 async function searchByQuery(queryTerm) {
    try{
        let endPoint = endpoints.getEndointWithInput(queryTerm)
        let result = await axios.get(endPoint)
        return result
    }catch(e){
        throw e
    }

}

module.exports = searchByQuery