const AdvertDataSource = require('../datasource/advert_datasource')
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

module.exports = {saveAdvertRepositary}