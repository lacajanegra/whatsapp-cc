
var Util = require('../util');
var lodash = require('lodash');

function Agent (data) {
    this.id               =   data.id;
    this.name             =   data.name;
    this.available        =   data.available;
}


Agent.prototype.availability = function () {
		console.log(this.available);
}
Agent.prototype.getId = function () {
		return this.id;
}
Agent.prototype.setAvailability = function (x) {
		this.available = x;
}


module.exports = Agent;
