const AdvertDataSource = require('../datasource/advert_datasource')
const LocationDataSource = require('../../location/datasource/search_location')
const responser = require('../../../utils/response_wrapper')

async function saveAdvertRepositary(advert){
    try{
        let advertToSave = await AdvertDataSource.saveAdvert(advert)
        return responser(0,advertToSave)
    }catch(e){
        console.log(e)
        return responser(1,e)
    }
} 

async function getAdvertsByLatLonRepositary(lat,lon){
    
    try{
        let boundariesResult = await LocationDataSource.getBoundariesByLatLng(lat,lon)
        let boundaries = boundariesResult.data.boundingbox
        let adverts = await AdvertDataSource.getAdvertsByBoundaries(boundaries,0)
        return responser(0,adverts)
    }catch(e){
        return responser(e,adverts)
    }
   
}

module.exports = {saveAdvertRepositary,getAdvertsByLatLonRepositary}