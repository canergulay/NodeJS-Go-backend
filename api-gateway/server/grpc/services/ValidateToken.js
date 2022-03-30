const {verifyToken} = require("../../utils/jwt_manager")

const ValidateToken = (ValidationRequest,callback)=>{
    console.log(ValidationRequest)
    const tokenVerified = verifyToken(ValidationRequest.token)
    if(tokenVerified){
         callback({isValid:true,userid:tokenVerified.userid}) 
    }else{
        callback({isValid:false,userid:""}) 
    }
    
}

module.exports = ValidateToken