'use strict';
var user_handler = {};

user_handler.loginPage = function(request,response) {
  response.render('login');
};

user_handler.signIn = function(request,response){
  response.redirect('/home');
};

user_handler.logout = function(request,response){
  request.logout();
  response.render('register');
};

module.exports = user_handler;
