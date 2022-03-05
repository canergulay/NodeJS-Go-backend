const Advert = require('../model/advert')
const rawMongoDBoperations = require('../../../../config/mongodb/raw_operations')
const searchLocationsDS = require('../../location/datasource/search_location')
async function saveAdvert(advert){
        advert.location.coordinates = [Number(advert.location.lat),Number(advert.location.lon)] 
        let myAdvert = new Advert(advert)
        return await myAdvert.save()        
}


async function populateAdvertToUpperLocations(advert){
        
        try{

        let firstName = advert.location.firstName
        let upperName = advert.location.upperName

        let firstNameToArray = firstName.split(',')

        firstNameToArray.map((location)=>location.trim()) 
                console.log(firstNameToArray)
        firstNameToArray.forEach(async element  =>  {
               await operate(element,advert)
        });

        if(!firstNameToArray.includes(upperName)){
                console.log('bura')
                await operate(upperName.trim(),advert)
        }
}catch(e){
        console.log(e)
}

}



async function operate(element,advert){
        let location = await searchLocationsDS(element)
        rawMongoDBoperations.checkIfCollectionExistsAndInsert(advert,location.data[0].place_id.toString(),location.data[0].display_name)
} 

module.exports = {saveAdvert,populateAdvertToUpperLocations}