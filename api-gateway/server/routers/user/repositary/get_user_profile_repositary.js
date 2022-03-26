const { FindUserById } = require("../datasource/find_user_by_id");
const responser = require("../../../utils/response_wrapper");

const GetUserProfileRepositary = (userid) => {
 return FindUserById(userid).then(user=>{
   console.log(user,"user")
    if (user) {
      return responser(0, user);
    } else {
      return responser(1, {});
    }
  }).catch(e=>{
    console.log(e)
    return responser(e, {});

  })
};

module.exports = { GetUserProfileRepositary };
