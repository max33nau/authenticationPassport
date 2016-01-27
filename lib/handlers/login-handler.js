'use strict';
var login_handler = {};
var database = require('.././database');



login_handler.loginPage = function(request,response) {
  response.render('login');
};




module.exports = login_handler;
