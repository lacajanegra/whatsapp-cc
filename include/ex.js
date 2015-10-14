//var UserList = require('api/models/user_list');

var User = require('./api/models/user');
var Sms = require('./api/models/sms');
var Wa = require('./api/models/wa');
var Em = require('./api/models/em');
var whatsapi = require('whatsapi');

var wa = whatsapi.createAdapter({
  msisdn         : '56998582284',
  password       : '6A6ElHaYCPJ0YoVNYHWjUTnXKYU=',
  username       : "test clo9",
  ccode          : '56',
}, false);


var user = new User({name:'Amaru',phone:'56971243863', mail:'andoapata@gmail.com'});
var lPoll = "Hola " + user.name + ", aca ira el link de la encuesta";
console.log(lPoll);
user.getPhone();
//Sms.sendSms(user.phone);
//Em.sendEm (user.name, user.mail);
wa.on('message', function(from, id, name, body, author){
   console.log("Message: "+body+" From: "+from+" Name: "+name);
});
//Wa.sendWa(wa,user.phone,lPoll,llama);
//Wa.sendmsj(wa,lPoll);

//wa.sendMessage('56951258509', lPoll + " ",function(err,id){
  //if (err) {console.log(err.message);return};
  //console.log('server received message %s',id);
//});//  258 chars

function llama(){
  console.log("Asda");
}

function chao(){
wa.disconnect();
}
console.log("listoco");
/*
UserList.limit(5, function(users){
  var user = users.pop()
  var compare = function(a,b) {
    var aDistance = distance(a.vectorize(), user.vectorize()) 
    var bDistance = distance(b.vectorize(), user.vectorize())
    var diff = aDistance - bDistance;
    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1
    } else {
      return 0
    }
  }

  console.log(user.vectorizableAttributes());
  console.log("-------");
  users.sort(compare).forEach(function(u){
    console.log(u.vectorizableAttributes());
  })
});
*/
