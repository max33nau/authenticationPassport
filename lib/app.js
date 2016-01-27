'use strict';

var express = require('express');
var passport = require('passport');
var path = require('path');
var LocalStrategy = require('passport-local').Strategy;
var my = require('./configDBandServer');
var dbData = require('./database');
var stats = require('./routes/routes-stats');
var register = require('./routes/routes-register');
var login = require('./routes/routes-login');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/player', stats());
app.use('/register', register());
app.use('/login', login());
// If page doesn't exist will throw back a 404 error
app.use(function(request,response,next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

var server = app.listen(process.env.PORT || my.serverPort, function () {
  console.log('server is connected');
  dbData.start(function () {
    console.log('connected to database');
  });
});


// module.exports = function start() {
//   var mainApp = {};
//   var app = express();
//
//   mainApp.start = function(callback) {
//     app.use('/player', stats());
//     // If page doesn't exist will throw back a 404 error
//     app.use(function(request,response,next) {
//       var error = new Error('Not Found');
//       error.status = 404;
//       next(error);
//     });
//
//     var server = app.listen(process.env.PORT || my.serverPort, function () {
//       console.log('server is connected');
//       dbData.start(function () {
//         console.log('connected to database');
//         callback();
//       });
//     });
//     return {
//       close: function close(callback) {
//         server.close(function () {
//           dbData.mongoose.connection.close(callback);
//         });
//       }
//     };
//   }
//   mainApp.app = app;
//   return mainApp;
// }
