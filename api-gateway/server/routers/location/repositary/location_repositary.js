const searchByQuery = require('../datasource/search_location')


async function getParsedLocations(query) {
    try {
        let results = await searchByQuery(query) 
        let resultsParsed = results.data.map(result =>  parseResult(result));
        if(resultsParsed[0].firstName.split(", ").length==1) return resultsParsed[0] // IF IT IS RESPRESENTING A COUNTRY, RETURN DIRECTLY THE FIRST RESULT
        return resultsParsed // IF IT IS NOT A COUNTRY, RETURN ALL THE PARSED RESULTS
    }catch(e){
        return e
    }
}

function parseResult(result){
    let id = result.place_id
    let type = result.type
    let names = parseByDisplayName(type,result.display_name)
    return {"id":id,"type":type,"firstName":names.firstName,"upperName":names.upperName}
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