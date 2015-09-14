var User, UserList, lodash;

UserList = require('./user_list');
lodash   = require('lodash');

function Chart () {
}

function pairwise (cb) {
  UserList.all(function(users){
    var keys, chartData;
    if (users.length < 1) { 
      return []; 
    }
    keys = lodash.keys(users[0].vectorizableAttributes());
    chartData = [];
    combinations(keys).forEach(function(keysCombination){
      var data;
      data = lodash.map(users, function(user){
        var dataPerKey = {};
        keysCombination.forEach(function(k){
          dataPerKey[k] = user.vectorizableAttributes()[k];
        });
        return dataPerKey;
      });
      chartData.push(data);
    });
    cb(chartData);
  });
}

function combinations(list) {
  if (list.length < 3) { return []; }
  var keys = [];
  for (var x = 0; x < list.length - 2; x++) {
    for (var y = x + 1; y < list.length - 1; y++) {
      for (var z = y + 1; z < list.length; z++) {
        keys.push([list[x], list[y], list[z]])
      }
    }
  }
  return keys;
}

Chart.prototype.pairwise = pairwise;

module.exports = Chart;
