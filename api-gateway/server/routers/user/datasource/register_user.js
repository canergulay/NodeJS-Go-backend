const User = require('../model/user');

async function registerUser(user) {
    let userToSave = User(user)
   return await userToSave.save()
}

module.exports = registerUser