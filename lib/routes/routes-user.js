'use strict';

var express = require('express');
var userHandler = require('../handlers/user-handler');
var router = express.Router();
var passport = require('passport');

var user = {};

user.login = function login() {
  router.get('/', userHandler.loginPage);
  router.post('/', passport.authenticate('local'), userHandler.signIn);
  return router;
};


user.logout = function logout() {
  router.get('/', userHandler.logout);
  return router;
};

module.exports = user;
