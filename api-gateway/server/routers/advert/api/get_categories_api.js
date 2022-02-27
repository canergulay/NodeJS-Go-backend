const getCategoriesRepositary = require('../repositary/get_categories_repositary')
const responser = require('../../../utils/response_wrapper')

async function getCategories(req,res){
    try{
        let type = req.body.type
        let categories
        if(type==0){
            categories = await getCategoriesRepositary.getAccomondationCategories()
        }else if(type == 1){
             categories = await getCategoriesRepositary.getFurnitureCategories()
        }else{
            res.send(responser(1,''))
            return
        }
        res.send(responser(0,categories))
    }catch(e){
        res.send(responser(1,e))
    }
}

module.exports = {getCategories}