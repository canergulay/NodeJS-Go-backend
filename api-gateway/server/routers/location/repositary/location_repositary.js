const searchByQuery = require('../datasource/search_location')


async function getParsedLocations(query) {
    try {
        let results = await searchByQuery(query)
        let firstOne = results.data[0]
        console.log(firstOne)
        let id = firstOne.place_id
        let type = firstOne.type
        let names = parseByDisplayName(type,firstOne.display_name)
        return {"id":id,"type":type,"firstName":names.firstName,"upperName":names.upperName}
    }catch(e){
        return e
    }
}


function parseByDisplayName(type, displayName){
    
    const displayNames = displayName.split(", ");
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
        if(displayNames[0]!=displayNames[1]){
            let firstName=displayNames[0]+', '+displayNames[1]
            return firstName
        }
        return displayNames[0]
    }

    function getLastOne() {
        if (displayNames[displayNames.length - 1]!=displayNames[0]) {
            return displayNames[displayNames.length - 1]
        }
        return ''
    }

}

module.exports = getParsedLocations