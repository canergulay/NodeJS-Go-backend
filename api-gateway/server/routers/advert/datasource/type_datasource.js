const Category = require('../model/type')

async function getCategoriesByType(type) {
    return await Category.find({'type':type})
}


module.exports = {getCategoriesByType}