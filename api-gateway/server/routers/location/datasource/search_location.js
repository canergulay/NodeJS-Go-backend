const axios = require('axios')
const endpoints = require('../../../utils/endpoints')


 async function searchByQuery(queryTerm) {
    try{
        let endPoint = endpoints.getEndointWithInput(queryTerm)
        let result = await axios.get(endPoint)
        return result
    }catch(e){
        throw e
    }

}

 function getBoundariesByLatLng(lat,lon){
    let endpoint = endpoints.getEndointForBoundriesByGivenLatLng(lat,lon)
    let result =  axios.get(endpoint)
    return result
}

function getMapBoxReverseDecode(lat,lon){
    let endpoint = endpoints.MapBoxReverseGeocodingURL(lat,lon)
    let result = axios.get(endpoint)
    return result
}

module.exports = {searchByQuery,getBoundariesByLatLng,getMapBoxReverseDecode}