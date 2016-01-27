'use strict';
var register_handler = {};
var database = require('.././database');
var dbData = database();
var User = dbData.createUserSchema();

register_handler.registerPage = function(request,response) {
  response.render('register');
};

register_handler.createUser = function(request,response) {
  console.log(request.body.newpassword,request.body.confirmpassword);
  if(request.body.newpassword === request.body.confirmpassword) {
    console.log('here');
    var newUser = new User();
    newUser.username = request.body.newusername;
    newUser.password = request.body.newpassword;
    newUser.save(function(error, user) {
      if (!error) {
        response.send(user.username + ' was added to the database with a id of ' + user['_id']);
      } else {
        response.send(error);
      }
    });
  }
};


module.exports = register_handler;
