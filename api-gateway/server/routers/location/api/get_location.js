const getParsedLocationsRepositary= require('../repositary/location_repositary')

 async function getLocation (req,res) {

    let searchTerm = req.body.location;

    console.log(searchTerm)

    if(searchTerm === null ){
    res.status(404).send('emptyquery')
        return
    }
    let result = await getParsedLocationsRepositary.getParsedLocations(searchTerm)
    console.log(result)
    res.send(result)
}




module.exports = getLocation
