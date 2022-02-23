const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashGivenValue =  function (value) {
     return bcrypt.hashSync(value, saltRounds)   
}

const compareGivenHashAndValue =  function (hash,value) {
    return bcrypt.compareSync(value, hash)
}

module.exports={hashGivenValue,compareGivenHashAndValue}