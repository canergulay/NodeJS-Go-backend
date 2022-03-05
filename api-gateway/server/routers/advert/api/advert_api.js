const AdvertRepositary = require('../repositary/advert_repositary')


async function saveAdvertAPI(req,res){
    let advert = req.body
    let result = await AdvertRepositary.saveAdvertRepositary(advert)
    res.send(result)
}

module.exports = {saveAdvertAPI}