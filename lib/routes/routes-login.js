var express = require('express');
var bodyParser = require('body-parser');
var loginHandler = require('../handlers/login-handler');
var router = express.Router();

module.exports = function login() {
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(passport.initialize());
  router.use(passport.session());
  router.get('/', loginHandler.loginPage);
  return router;
}
