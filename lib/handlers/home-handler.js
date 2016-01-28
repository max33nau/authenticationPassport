'use strict';
var home_handler = {};
var database = require('.././database');


home_handler.mainPage = function(request,response) {
    response.render('index', {username: `Your are current signed in as: `}); /*${request.user.username}*/
};




module.exports = home_handler;
