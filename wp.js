//var UserList = require('api/models/user_list');

var User = require('./api/models/user');
var Sms = require('./api/models/sms');
var Wa = require('./api/models/wa');
var Em = require('./api/models/em');
var whatsapi = require('whatsapi');

var wa = whatsapi.createAdapter({
  msisdn         : '56952832363',
  password       : 'VNGSCWfs7fzTSw3i+Xh2xKXy+6A=',
  username       : "CLO",
  ccode          : '56',
, false);


wa.connect(function connected(err) {
    if (err) { console.log(err); return; }
    console.log('Connected');
    // Now login
    wa.login(logged);
});

function logged(err,cb) {
    if (err) { console.log(err); return; }
    console.log('Logged in to WA server');
    wa.sendIsOnline();
    console.log('loged');
});



function receive(err) {
    if (err) { console.log(err); return; }
    console.log('Logged in to WA server');
    wa.sendIsOnline();
    console.log('loged');
});



