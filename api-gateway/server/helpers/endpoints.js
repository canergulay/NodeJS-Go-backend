function getEndointWithInput(city) {
    return `https://nominatim.openstreetmap.org/search.php?city=${city}&format=json`
}


function getEndointWithInputForCountry(country) {
    return `https://nominatim.openstreetmap.org/search.php?q=${country}&format=json`
}

module.exports = {getEndointWithInput,getEndointWithInputForCountry}