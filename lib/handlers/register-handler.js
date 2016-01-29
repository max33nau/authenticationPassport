'use strict';
var register_handler = {};
var models = require('.././models');
var User = models.user;
require('passport');

register_handler.registerPage = function(request,response) {
  response.render('register');
};

register_handler.createUser = function(request,response) {
  if(request.body.newpassword === request.body.confirmpassword) {
    User.register(new User({
        username: request.body.newusername
      }),  request.body.confirmpassword, function(error, account){
        if (error) {
          return response.render('register', {
            info: 'That username has already been taken. Sorry'
          });
        } else {
          return response.redirect('/login');
        }


    });
  } else {
    return response.render('register', {
      info: 'Passwords did not match'
    });
  }
};


module.exports = register_handler;
