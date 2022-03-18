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


module.exports = {getEndointWithInput,getEndointWithInputForCountry,getEndointForBoundriesByGivenLatLng}