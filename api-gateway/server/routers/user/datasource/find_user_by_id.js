const User = require("../model/user");

const FindUserById = async (userid) => {
  const result = User.findById(userid);
  return result
    .then((user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        picture: user.picture,
      };
    })
    .catch((e) => {
      return null;
    });
};

module.exports = { FindUserById };
