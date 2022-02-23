const registerUserRepositary = require('../repositary/register_user_repositary')


async function registerUserAPI(req,res){
    let userCredentials = req.body
    let registeredUser = await registerUserRepositary(userCredentials)
    res.send(registeredUser) 
}

module.exports = registerUserAPI