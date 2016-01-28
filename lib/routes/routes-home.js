var express = require('express');
var homeHandler = require('../handlers/home-handler');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticatedforHomePage(request, response, next) {
    if (request.isAuthenticated()) { return next(); }
    response.render('login', {notAuthorized: 'You are not authorized to view that page without signing in.',
                              message: 'please log in or sign up to continue'});
}
module.exports = function home() {
  router.get('/',ensureAuthenticatedforHomePage, homeHandler.mainPage);
  return router;
}
