const AdvertRepositary = require('../repositary/advert_repositary')


async function saveAdvertAPI(req,res){
    let advert = req.body
    let result = await AdvertRepositary.saveAdvertRepositary(advert)
    res.send(result)
}

 async function getAdvertsAPI(req,res){
    let lat = req.query.lat
    let lon = req.query.lon
   res.send(await AdvertRepositary.getAdvertsByLatLonRepositary(lat,lon))
}

module.exports = {saveAdvertAPI,getAdvertsAPI}