const AdvertDataSource = require("../datasource/advert_datasource");
const LocationDataSource = require("../../location/datasource/search_location");
const locationRepositary = require("../../location/repositary/location_repositary");
const responser = require("../../../utils/response_wrapper");
const Advert = require("../model/advert");
const {Logger} = require("../../../utils/log_manager")
async function saveAdvertRepositary(advert, userid) {
  try {
    
    advert.owner = userid
    
    advert.loc = {
      type: "Point",
      coordinates: [Number(advert.location.lat), Number(advert.location.lon)],
    };

    let advertToSave = await AdvertDataSource.saveAdvert(advert);
    // getPointPinnedAndParse(advert) // NONBLOCKIN OPERATION THAT WILL FETCH SPECIFIC POINTPINNED ADRESS FROM MAPBOX AND PLACE IN THE ADVERT
    const a = await Advert(advertToSave).populate("category");

    return responser(0, a);
  } catch (e) {
    console.log(e);
    return responser(1, e);
  }
}

async function getPointPinnedAndParse(advertToUpdate) {
  if (advertToUpdate.address.pointPinned.coordinates.length == 2) {
    let [lat, lon] = advertToUpdate.pointPinned.coordinates;
    try {
      let pointPinnedAddress = await locationRepositary.getMapBoxResult(
        lat,
        lon
      );
      let advert = Advert(advertToUpdate);
      console.log(pointPinnedAddress);
      advert.pointPinned.address = pointPinnedAddress;
      advert.save();
    } catch (e) {
      console.log(e);
    }
  }
}

async function getAdvertsByLatLonRepositary(lat, lon,lastid) {
  try {
    let boundariesResult = await LocationDataSource.getBoundariesByLatLng(
      lat,
      lon
    );
    let boundaries = boundariesResult.data.boundingbox;
    let adverts = await AdvertDataSource.getAdvertsByBoundaries(boundaries, 0,lastid);
    return responser(0, adverts);
  } catch (e) {
    console.log(e)

    Logger(e,"An unexpected error has occured while getting adverts by the following last lon and lastid values,",lat,lon,lastid)
    return responser(1, []);
  }
}

function GetMyAdvertsRepositary(userid){
  return AdvertDataSource.GetAdvertsByUserId(userid).then(adverts=>{
    return responser(0,adverts)
  }).catch(e=>{
    return responser(1,e)
  })
}

function DeleteMyAdvert(advertid,userid){
  try{
    const advert = AdvertDataSource.DeleteAdvertById(advertid,userid)
    return responser(0,{isDeleted:true})
  }catch(e){
    Logger(e,`An unexpected error when trying to delete advert by advertid and userid : ${advertid} ${userid}`)
    return responser(1,{isDeleted:false})
  }
  
}

module.exports = { saveAdvertRepositary, getAdvertsByLatLonRepositary , GetMyAdvertsRepositary,DeleteMyAdvert};
