const getCategoriesDS = require("../datasource/type_datasource")

async function getAccomondationCategories(){
    return await getCategoriesDS.getCategoriesByType(0)
}


async function getFurnitureCategories(){
    return await getCategoriesDS.getCategoriesByType(1)
}

module.exports = {getAccomondationCategories,getFurnitureCategories}

