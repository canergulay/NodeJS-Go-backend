const Advert = require("../model/advert");
const rawMongoDBoperations = require("../../../../config/mongodb/raw_operations");
const searchLocationsDS = require("../../location/datasource/search_location");
const Deleted = require("../model/deleted");
async function saveAdvert(advert) {
  let myAdvert = new Advert(advert);
  return await myAdvert.save();
}

const SaveDeletedAdvert = (deleter, target) => {
  return new Deleted({ deleter, target }).save();
};

function getAdvertsByBoundaries(lastid, location) {
  
  console.log(location,lastid,"here we have them !!");

  // ONE SIDE NOTE HERE,
  // I HAD INDEED INTENDED TO ESTABLISH THIS FUNCTIONALITY ON TOP OF LOCATION BBOX AND ITS CENTER LAT-LON VALUES
  // FOR SOME REASONS I COULDN'T GET THE CORRECT ACCURACY FOR THE LOCATIONS ALTOUGH EVERYTHING SEEMED TO FINE.
  // THAT COULD HAVE LET US HAS A INCLUSIVE LOCATION SEARCH LIKE GETTING ALL THE ADVERTS IN ISTANBUL WHEN LOOKING FOR TURKEY 
  // OR GETTING ALL THE ADVERTS IN USKUDAR WHEN YOU LOOKING FOR ISTANBUL ETC.
  // FOR THE SAKE OF SIMPLICITY AND FOR THE QUICK RELEASE PURPOSES OF MVP, I WILL SKIP THAT FUNCTIONALITY FOR NOW.
  // HOWEVER, I HAVE THE LOCATION MODEL PASSED TO GET ADVERTS WHICH HAS BOTH LOCATION ID AND ITS LATLONG && BBOX...
  // SO YEAH, IN THE NEAR FUTURE IF SOME REASONS WE ARE OBLIGATED TO MOVE TO THAT APPROACH, WE CAN EASILY DO THAT.
  // NONETHELESS, HAVING LOCATION IDS FOR THE ADVERTS IS NOT SOMETHING YOU MIGHT WANT TO DO SINCE LOCATION IDS ARE SPECIFIC TO API YOU USE.
  // SO IF WE MOVE FROM MAPBOX TO ANY OTHER GEOSEARCH API PROVIDER ALL WE WILL BE LEFT WITH IS MEANINGLESS STRINGS THAT ARE NOT RECOGNIZED BY THAT API.  
  // BEING ID-AGNOSTIC AND BUILDING EVERYTHING ON TOP OF REAL COORDINATES IS CRUCIAL IN THAT CONTEXT.
  // BUT AGAIN, FOR THE SAKE OF MVP, WE WILL HANDLE THIS AND REINDEX THE COLLECTION LATER ON.

  let advertQueryObject =
    lastid == "null"
      ? { "loc.id": location.id }
      : { "loc.id": location.id, _id: { $lt: lastid } };
  return Advert.find(advertQueryObject)
    .sort({ _id: -1 })
    .populate("category")
    .limit(10);
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

function GetAdvertsByUserId(userid) {
  const adverts = Advert.find({ owner: userid }).populate("category");
  return adverts;
}

async function DeleteAdvertById(advertid, userid) {
  let advert = await Advert.findById(advertid);
  if (advert.owner == userid) {
    const advertDeleted = await Advert.findByIdAndDelete(advertid);
    if (!advertDeleted) {
      throw new Error(
        "unexpectedError",
        `There is no an advert with the id ${advertid}`
      );
    }
    return advertDeleted;
  } else {
    throw new Error(
      "unexpectedError",
      "The advert owner and given userid didn't match."
    );
  }
}

module.exports = {
  saveAdvert,
  populateAdvertToUpperLocations,
  getAdvertsByBoundaries,
  GetAdvertsByUserId,
  DeleteAdvertById,
  SaveDeletedAdvert,
};
