const { UploadAvatarDS } = require("../datasource/upload_avatar");
const responser = require("../../../utils/response_wrapper");
const { Logger } = require("../../../utils/log_manager");
const UploadAvatarRepositary = (userid, imagePath) => {
  return UploadAvatarDS(userid, imagePath)
    .then((userUpgraded) => {
      return responser(0, { picture: imagePath });
    })
    .catch((e) => {
      Logger(e,
        "an unexpected error has occured when trying to change user picture for the user with the id ",
        userid,
        "and the image path ,",
        imagePath
      );
      return responser(1, {});
    });
};

module.exports = { UploadAvatarRepositary };
