'use strict';

var express = require('express');
var my = require('./configDBandServer');
var database = require('./database');
var stats = require('./stats');

module.exports = function start(callback) {
  var app = express();
  var dbData = database();

  app.use('/player', stats());

  var server = app.listen(process.env.PORT || my.serverPort, function () {
    console.log('server is connected');
    dbData.start(function () {
      console.log('connected to database');
      callback();
    });
  });

  return {
    close: function close(callback) {
      server.close(function () {
        dbData.mongoose.connection.close(callback);
      });
    }
  };
}
