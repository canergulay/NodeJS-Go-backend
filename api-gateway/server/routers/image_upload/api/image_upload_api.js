const responseWrapper = require('../../../utils/response_wrapper')

function imageUpload(req,res){
    
    res.send(responseWrapper(0, {imagePath:'assets/'+req.imagePath}))
}


module.exports = {imageUpload} 