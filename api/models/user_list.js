var Util, User, pg, dbConfig;

pg       = require('pg');
dbConfig = require('./../db');
User     = require('./user');
Util     = require('../util');

module.exports.all = function (cb) {
  var limit = 15;
  pg.connect(dbConfig, function(err, client, done) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }

    var usersQuery = client.query('SELECT * FROM persons LIMIT '+limit);
    var users = [];
    usersQuery.on('row', function(row){
      var user = new User (Util.camelize(row));
      users.push(user);
    });
    usersQuery.on('end', function(){
      client.end();
      cb(users);
    });
  });
}

module.exports.limit = function (limit, cb) {
  pg.connect(dbConfig, function(err, client, done) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }

    var usersQuery = client.query("SELECT * FROM persons WHERE economic_situation = 'fine' LIMIT "+limit);
    var users = [];
    usersQuery.on('row', function(row){
      var user = new User (Util.camelize(row));
      users.push(user);
    });
    usersQuery.on('end', function(){
      client.end();
      cb(users);
    });
  });
}

module.exports.create_test = function (limit, cb) {
  pg.connect(dbConfig, function(err, client, done) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }

    var usersQuery = client.query("SELECT * FROM persons WHERE economic_situation = 'fine' LIMIT "+limit);
    var users = [];
    usersQuery.on('row', function(row){
      var user = new User (Util.camelize(row));
      users.push(user);
    });
    usersQuery.on('end', function(){
      client.end();
      cb(users);
    });
  });
}
