const connectObject = require("firebase-admin");
const credentials = require("./privatekey.json");

connectObject.initializeApp({
  credential: connectObject.credential.cert(credentials)
});

const dbconnect = connectObject.firestore();
module.exports = dbconnect;