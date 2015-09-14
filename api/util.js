var lodash = require('lodash');

module.exports.decamelize = function (data) {
    var result = {};

    lodash.each(data, function(value, key) {
        result[lodash.snakeCase(key)] = value;
    });

    return result;
}

module.exports.camelize = function (data) {
    var result = {};

    lodash.each(data, function(value, key) {
        result[lodash.camelCase(key)] = value;
    });

    return result;
}
