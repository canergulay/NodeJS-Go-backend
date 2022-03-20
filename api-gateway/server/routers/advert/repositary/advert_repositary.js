const AdvertDataSource = require('../datasource/advert_datasource')
const LocationDataSource = require('../../location/datasource/search_location')
const locationRepositary = require('../../location/repositary/location_repositary')
const responser = require('../../../utils/response_wrapper')
const Advert = require('../model/advert')

async function saveAdvertRepositary(advert){
    try{
        let advertToSave = await AdvertDataSource.saveAdvert(advert)
        getPointPinnedAndParse(advert) // NONBLOCKIN OPERATION THAT WILL FETCH SPECIFIC POINTPINNED ADRESS FROM MAPBOX AND PLACE IN THE ADVERT
        return responser(0,advertToSave)
    }catch(e){
        console.log(e)
        return responser(1,e)
    }
} 

async function getPointPinnedAndParse(advertToUpdate){
    if(advertToUpdate.pointPinned.coordinates.length==2){
        let [lat,lon] = advertToUpdate.pointPinned.coordinates
        try {
            let pointPinnedAddress = await locationRepositary.getMapBoxResult(lat,lon)
            let advert = Advert(advertToUpdate)
            console.log(pointPinnedAddress)
            advert.pointPinned.address = pointPinnedAddress
            advert.save()
        } catch (e) {   
            console.log(e)
        }
        
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