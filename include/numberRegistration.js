var whatsapi = require('whatsapi');
var crypto = require('crypto');
var read = require('read');

var config = {
    msisdn: '56952832363', // fill it with your phone
    device_id: crypto.randomBytes(20).toString('hex')
};



var WhatsApiRegistration = whatsapi.createRegistration(config);

WhatsApiRegistration.codeRequest('sms', function(err, res) {
   if (err) {
      console.log(err);  
    } 
    
    console.log(res);

    read({prompt: 'Code: '}, function (err, code) {
    if (err) {
      console.log(err);  
    } 


        code = code.replace(/[^0-9]/,'');
        WhatsApiRegistration.codeRegister(code, function(err, res) {
   if (err) {
      console.log(err);  
    } 
    

            console.log(res);
        });
    });
});
