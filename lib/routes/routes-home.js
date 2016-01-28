var express = require('express');
var homeHandler = require('../handlers/home-handler');
var router = express.Router();


module.exports = function home() {
  router.get('/', homeHandler.mainPage);
  return router;
}
