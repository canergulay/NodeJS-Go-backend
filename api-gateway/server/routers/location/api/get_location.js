const searchByQuery= require('../datasource/search_location')

 async function getLocation (req,res) {

    let searchTerm = req.body.location;

    console.log(searchTerm)

    if(searchTerm === null ){
    res.status(404).send('emptyquery')
        return
    }
    let result = await searchByQuery(searchTerm)
    res.send(result.data)
}



module.exports = getLocation
