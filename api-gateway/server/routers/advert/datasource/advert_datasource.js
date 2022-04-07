const Advert = require("../model/advert");
const rawMongoDBoperations = require("../../../../config/mongodb/raw_operations");
const searchLocationsDS = require("../../location/datasource/search_location");

async function saveAdvert(advert) {

  let myAdvert = new Advert(advert);
  return await myAdvert.save();
}

function getAdvertsByBoundaries(boundaries, type) {
  console.log(boundaries);
  console.log(type);
  return Advert.find()
    .sort({ createdAt: -1 })
    .where("loc")
    .populate("category")
    .within({
      box: [
        [Number(boundaries[0]), Number(boundaries[2])],
        [Number(boundaries[1]), Number(boundaries[3])],
      ],
    });
}

async function populateAdvertToUpperLocations(advert) {
  try {
    let firstName = advert.location.firstName;
    let upperName = advert.location.upperName;

    let firstNameToArray = firstName.split(",");

    firstNameToArray.map((location) => location.trim());
    console.log(firstNameToArray);
    firstNameToArray.forEach(async (element) => {
      await operate(element, advert);
    });

    if (!firstNameToArray.includes(upperName)) {
      console.log("bura");
      await operate(upperName.trim(), advert);
    }
  } catch (e) {
    console.log(e);
  }
}

async function operate(element, advert) {
  let location = await searchLocationsDS(element);
  rawMongoDBoperations.checkIfCollectionExistsAndInsert(
    advert,
    location.data[0].place_id.toString(),
    location.data[0].display_name
  );
}

function GetAdvertsByUserId(userid){
  const adverts = Advert.find({owner:userid}).populate("category")
  return adverts
}

async function DeleteAdvertById(advertid,userid){
  let advert = await Advert.findById(advertid)
  if(advert.owner == userid){
    const advertDeleted = await Advert.findByIdAndDelete(advertid)
    if(!advertDeleted){
    throw new Error("unexpectedError",`There is no an advert with the id ${advertid}`)
    }
    return advertDeleted
  }else{
    throw new Error("unexpectedError","The advert owner and given userid didn't match.")
  }
}

module.exports = {
  saveAdvert,
  populateAdvertToUpperLocations,
  getAdvertsByBoundaries,
  GetAdvertsByUserId,
  DeleteAdvertById
};
