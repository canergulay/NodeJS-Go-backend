var jwt = require('jsonwebtoken');


function generateToken(payload,expiresIn) {
    return jwt.sign(payload, 
        process.env.SECRETKEY,{
        expiresIn:expiresIn
    });
}

function verifyToken(token){
    return jwt.verify(token, process.env.SECRETKEY)
}

module.exports = {generateToken,verifyToken}