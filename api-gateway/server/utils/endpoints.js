require('dotenv').config()
let allowedCountries = "pt,es,fr,be,nl,de,ch,it,tr,gr,pl,cz,at,us,ca"


function getEndointWithInput(city) {
    let endpoint = `https://nominatim.openstreetmap.org/search.php?q=${city}&format=json&countrycodes=${allowedCountries}`
    return encodeURI(endpoint)
}


function getEndointWithInputForCountry(country) {
    let endpoint = `https://nominatim.openstreetmap.org/search.php?q=${country}&format=json&countrycodes=${allowedCountries}`
    return encodeURI(endpoint)
}

function getEndointForBoundriesByGivenLatLng(lat,lon) {
    let endpoint = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&countrycodes=${allowedCountries}`
    return encodeURI(endpoint)
}
const MapBoxReverseGeocodingURL = (lat,lon) =>{
    let access_token = process.env.APIKEY
    let endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lon}.json?access_token=${access_token}&types=poi`
    return endpoint
}

module.exports = {getEndointWithInput,getEndointWithInputForCountry,getEndointForBoundriesByGivenLatLng,MapBoxReverseGeocodingURL}