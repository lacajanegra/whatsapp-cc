var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://ff65g3uwj12.firebaseio-demo.com/");
 myFirebaseRef.push({name: "desde node", text: "adsads"});