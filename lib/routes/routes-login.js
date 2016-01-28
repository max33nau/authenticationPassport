var express = require('express');
var bodyParser = require('body-parser');
var loginHandler = require('../handlers/login-handler');
var models = require('.././models')
var User = models.user;
var router = express.Router();
var passport = require('passport');

module.exports = function login() {
  router.get('/', loginHandler.loginPage);
  router.post('/', passport.authenticate('local'), loginHandler.signIn);
  return router;
}
