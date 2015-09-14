
var Util = require('../util');
var lodash = require('lodash');

function Attended (data) {
    this.id               =   data.id;
    this.number           =   data.number;
}


Attended.prototype.getNumber = function () {
		console.log(this.number);
}
Attended.prototype.getId = function () {
		return this.id;
}


module.exports = Attended;
