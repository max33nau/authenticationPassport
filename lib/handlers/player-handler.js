'use strict';
var player_handler = {}
var models = require('.././models')
var Player = models.player;

player_handler.getAll = function(request, response) {
  Player.find({}).sort({ name: 'asc' }).then(function (players) {
    if (players) {
      response.send(players);
      response.end();
    }
  }).then(null, function (error) {
    response.send(error);
    resonse.end();
  });
};

player_handler.getPlayerById = function(request, response) {
  Player.findById(request.params.id).then(function (player) {
    if (player) {
      response.send(player);
      response.end();
    }
  }).then(null, function (error) {
    response.send(error);
    response.end();
  });
}

player_handler.getPlayerByName = function(request, response) {
  var playerName = request.query.name.toUpperCase();
  Player.find({ name: playerName } ).then(function (player) {
    if (player[0].name) {
      response.send(player);
    }
  }).then(null, function (error) {
    return response.render('index',{error: 'that player is not in the database'});
  });
}

player_handler.createPlayer = function(request, response) {
  var newPlayer = new Player();
  newPlayer.name = request.body.name;
  newPlayer.team = request.body.team;
  newPlayer.age = request.body.age;
  newPlayer.height.feet = request.body.feet;
  newPlayer.height.inches = request.body.inches;
  newPlayer.position = request.body.position;
  newPlayer.rookie = request.body.rookie;
  newPlayer.numberOfGamesPlayed = request.body.numberOfGamesPlayed;
  newPlayer.totals.points = request.body.totalPoints;
  newPlayer.totals.rebounds = request.body.totalRebounds;
  newPlayer.totals.assists = request.body.totalAssists;
  newPlayer.totals.steals = request.body.totalSteals;
  newPlayer.totals.blocks = request.body.totalBlocks;
  newPlayer.average.pointsPerGame = Number((newPlayer.totals.points / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.reboundsPerGame = Number((newPlayer.totals.rebounds / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.assistsPerGame = Number((newPlayer.totals.assists / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.stealsPerGame = Number((newPlayer.totals.steals / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.blocksPerGame = Number((newPlayer.totals.blocks / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.save(function (error, player) {
    if (!error) {
      response.send(player.name + ' was added to the database with a id of ' + player['_id']);
    } else {
      response.send(error);
    }
    response.end();
  });
};

player_handler.updateWholeObject = function(request, response) {
  Player.findById(request.params.id).then(function (player) {
    if (player) {
      var playerkeys = ['name', 'team', 'age', 'height', 'position', 'rookie', 'numberOfGamesPlayed', 'totals', 'average'];
      for (var ii in playerkeys) {
        if (request.body[playerkeys[ii]]) {
          player[playerkeys[ii]] = request.body[playerkeys[ii]];
        } else {
          player[playerkeys[ii]] = null;
        }
      }
      return player;
    }
  }).then(function (player) {
    if (player) {
      player.save(function (error, player) {
        if (!error) {
          response.send(player);
        } else {
          response.send(error);
        }
        response.end();
      });
    }
  }).then(null, function (error) {
    if (error) {
      response.send(error);
      response.end();
    }
  });
}

player_handler.updatePlayerInfo= function(request, response) {
  Player.update({ _id: request.params.id }, { $set: request.body }, function (error) {
    if (error) {
      response.send(error);
      response.end();
    } else {
      response.send('update data was a success');
      response.end();
    }
  });
}

player_handler.removePlayer = function(request, response) {
  Player.remove({ _id: request.params.id }).then(function (player, error) {
    if (player) {
      response.send(request.params.id + ' was removed');
      response.end();
    }
  }).then(null, function (error) {
    if (error) {
      response.send(error);
      response.end();
    }
  });
}

module.exports = player_handler;
