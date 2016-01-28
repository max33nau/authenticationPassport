var express = require('express');
var bodyParser = require('body-parser');
var registerHandler = require('../handlers/register-handler');
var router = express.Router();
var passport = require('passport');


module.exports = function register() {
  router.get('/', registerHandler.registerPage);
  router.post('/', registerHandler.createUser);
  return router;
}
