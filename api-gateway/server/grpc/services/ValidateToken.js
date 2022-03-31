const { verifyToken } = require("../../utils/jwt_manager");

const ValidateToken = (ValidationRequest, callback) => {
  console.log(ValidationRequest.request);
  try {
    const tokenVerified = verifyToken(ValidationRequest.request.token);
    callback(null, { isValid: true, userid: tokenVerified.userid.toString()});
  } catch (e) {
    console.log('here 2',e)
    switch (e.name) {
      case "TokenExpiredError":
        callback(null, { isValid: false, userid: "this jwt has been expired" });
        break;
      case "JsonWebTokenError":
      callback(null, { isValid: false, userid: "problematic jwt" });
      break;
      default:
        callback(null, { isValid: false, userid: "unexpected" });
    }
  }
};

module.exports = ValidateToken;
