'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var playerHandler = require('../handlers/player-handler');
var router = express.Router();

module.exports = function stats() {
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: false }));
  router.get('/find', playerHandler.getPlayerByName);
  router.get('/', playerHandler.getAll);
  router.get('/:id', playerHandler.getPlayerById);
  router.post('/', playerHandler.createPlayer);
  router.put('/:id', playerHandler.updateWholeObject);
  router.patch('/:id', playerHandler.updatePlayerInfo);
  router.delete('/:id', playerHandler.removePlayer);
  return router;
}
