'use strict';
var login_handler = {};
var database = require('.././database');
var models = require('.././models')
var User = models.user;
var passport = require('passport');

login_handler.loginPage = function(request,response) {
  response.render('login');
};

login_handler.signIn = function(request,response){
  response.redirect('/home');

};


module.exports = login_handler;
