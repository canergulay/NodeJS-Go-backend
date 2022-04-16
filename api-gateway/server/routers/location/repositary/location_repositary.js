const locationDataSource = require("../datasource/search_location")
const responseWrapper = require("../../../utils/response_wrapper")

async function getParsedLocations(query) {
  try {
    let results = await locationDataSource.searchByQuery(query)
    if (results.data.features.length == 0) return []

    let resultsFiltered = results.data.features.filter(place=>place.bbox)
    let resultsParsed = resultsFiltered.map((result) => parseResult(result))
    console.log(resultsParsed)

    if (resultsParsed.length>0 && resultsParsed[0].firstName.split(", ").length == 1)
      return responseWrapper(0, [resultsParsed[0]]) // IF IT IS RESPRESENTING A COUNTRY, RETURN DIRECTLY THE FIRST RESULT
    if (resultsParsed.length == 1) return responseWrapper(0, resultsParsed)
    return responseWrapper(0, resultsParsed) // IF IT IS NOT A COUNTRY, RETURN ALL THE PARSED RESULTS
  } catch (e) {
    return responseWrapper(1, e)
  }
}

async function getMapBoxResult(lat, lon) {
  try {
    let result = await locationDataSource.getMapBoxReverseDecode(lat, lon)
    let features = result.data.features
    console.log(features)
    if(features.length > 0) {
        return features[0].properties.address
    }
    throw new Error("no such a thing !")
  } catch (e) {
    throw e
  }
}

function parseResult(result) {
  let {id,place_type} = result
  let lat = result.center[1]
  let lon = result.center[0]
  let names = parseByDisplayName(result)
  return {
    id: id,
    type: place_type[0],
    firstName: names.firstName,
    upperName: names.upperName,
    lat: lat,
    lon: lon,
    bbox:result.bbox
  }
}

function parseByDisplayName(place) {
  const displayNames = place.place_name.split(", ")
  const upperName = displayNames[displayNames.length-1]
  const firstName = getFirstName(displayNames)
  return {upperName,firstName}
}

function getFirstName(displayNames){
  console.log(displayNames)
  if(displayNames[0]!==displayNames[1] && displayNames[1]){
   return `${displayNames[0]}, ${displayNames[1]}`
  }else{
     return displayNames[0]
  }
}



module.exports = {getParsedLocations,getMapBoxResult}
