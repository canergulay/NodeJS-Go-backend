const User = require("../model/user");

const FindUserById = async (userid) => {
  const result = User.findById(userid);
  return result
    .then((user) => {
      return {
        _id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        picture: user.picture,
        fcm: user.fcm,
      };
    })
    .catch((e) => {
      return null;
    });
};



module.exports = { FindUserById };
