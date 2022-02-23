var jwt = require('jsonwebtoken');


function generateToken(payload,expiresIn) {
    return jwt.sign(payload, 
        process.env.SECRETKEY,{
        expiresIn:expiresIn
    });
}

function checkToken(){

}

module.exports = {generateToken,checkToken}