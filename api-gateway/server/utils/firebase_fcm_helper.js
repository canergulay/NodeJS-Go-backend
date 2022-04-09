var admin = require("firebase-admin");

var serviceAccount = require("./cityspot-284c9-firebase-adminsdk-6l2lh-13f8ac3fd6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const SendNotificationToUser = async (tokens, message) => {
  return await admin.messaging().sendToDevice(
    tokens,
    {
      notification: {
        title: "You have a new message !",
        body: message,
      },
    },
  );
};


module.exports = SendNotificationToUser