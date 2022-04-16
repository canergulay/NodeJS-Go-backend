const AdvertRepositary = require('../repositary/advert_repositary')


async function saveAdvertAPI(req,res){
    let advert = req.body

    let result = await AdvertRepositary.saveAdvertRepositary(advert,req.userid)
    res.send(result)
}

 async function getAdvertsAPI(req,res){
    const location = req.body
    let {lastid} = req.query

    let response = await AdvertRepositary.getAdvertsByLatLonRepositary(lastid,location)
    console.log(response)
   res.send(response)
}

function getMyAdvertsAPI(req,res){
    let userid = req.userid
    AdvertRepositary.GetMyAdvertsRepositary(userid).then(response=>{
        console.log(response)
        res.send(response) 
    })
}

function deleteMyAdvertAPI(req,res){
    let userid = req.userid
    let advertid = req.body.advertid
    let response = AdvertRepositary.DeleteMyAdvert(advertid,userid)
    res.send(response)
}

module.exports = {saveAdvertAPI,getAdvertsAPI,getMyAdvertsAPI,deleteMyAdvertAPI}