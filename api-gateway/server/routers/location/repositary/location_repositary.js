const searchByQuery = require('../datasource/search_location')
const responseWrapper = require('../../../utils/response_wrapper');

async function getParsedLocations(query) {
    try {
        let results = await searchByQuery(query) 

        if(results.data.length==0) return []
        
        let resultsParsed = results.data.map(result =>  parseResult(result));
        console.log(resultsParsed)

        if(resultsParsed[0].firstName.split(", ").length==1) return responseWrapper(0,[resultsParsed[0]])  // IF IT IS RESPRESENTING A COUNTRY, RETURN DIRECTLY THE FIRST RESULT
        if(resultsParsed.length==1) return responseWrapper(0,resultsParsed) 
        return responseWrapper(0,resultsParsed)  // IF IT IS NOT A COUNTRY, RETURN ALL THE PARSED RESULTS
    }catch(e){
         return responseWrapper(1,e) 
    }
}

function parseResult(result){
    let id = result.place_id
    let type = result.type
    let lat = result.lat
    let lon = result.lon
    let names = parseByDisplayName(type,result.display_name)
    return {"id":id,"type":type,"firstName":names.firstName,"upperName":names.upperName,"lat":lat,"lon":lon}
}


function parseByDisplayName(type, displayName){
    
    const displayNames = displayName.split(", ")

    if(type!='city'){
        let firstName=getFirstNameByTwoNames()
        let upperName=getLastOne()
        return {firstName,upperName}
    }else{
        let firstName=displayNames[0]
        let upperName=getLastOne()
        return {firstName,upperName}
    }



    function getFirstNameByTwoNames() {
        if(displayNames.length==1) return displayNames[0]
        if(displayNames[0]!=displayNames[1]){
            let firstName=displayNames[0]+', '+displayNames[1]
            return firstName
        }
        return displayNames[0]
    }

    function getLastOne() {
        if(displayNames.length==1) return ''
        if (displayNames[displayNames.length - 1]!=displayNames[0]) {
            return displayNames[displayNames.length - 1]
        }
        return ''
    }

}

module.exports = getParsedLocations