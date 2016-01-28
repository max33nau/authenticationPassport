'use strict';
var home_handler = {};
var database = require('.././database');


home_handler.mainPage = function(request,response) {
  response.render('index');
};




module.exports = home_handler;
