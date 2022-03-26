const {verifyToken} = require('../utils/jwt_manager')
const responser = require('../utils/response_wrapper')

const noTokenFound = "no token found !"
const tokenBroken = "token has been expired, get a new one !"

const AuthenticationMiddleVare = (req,res,next)=>{
    let token = req.headers.token

    if(!token){
        res.send(responser(401,noTokenFound))
        return
    }

    let tokenDecrypted = verifyToken(token)

    if(!tokenDecrypted){
        res.send(responser(401,tokenBroken))
        return
    }

    req.userid = tokenDecrypted.id
    next()

}

module.exports=AuthenticationMiddleVare