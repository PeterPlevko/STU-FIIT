// Peter plevko
const { application } = require('express');
var express = require('express');
var router = express.Router();
var gameService;

/* var gameService = require('../services/gameService'); */

// uvidime
router.post('/checkKey', function (req, res) {
  gameService.checkKey(req.body);
  res.send({ uspech: 'uspech' });
});

// this function is used to move misiles
router.post('/moveMissiles', function (req, res) {
  gameService.moveMissiles();
  res.send({ poslate: 'poslate' });
});

//  this function is used to move aliens
router.post('/moveAliens', function (req, res) {
  gameService.moveAliens();
  res.send({ poslate: 'poslate' });
});

//  this function is used to lower alienbs
router.post('/lowerAliens', function (req, res) {
  gameService.lowerAliens();
  res.send({ poslate: 'poslate' });
});

//  this function is used to check if rocket colides with alien
router.post('/RaketaKolidujeSVotrelcom', function (req, res) {
  gameService.RaketaKolidujeSVotrelcom();
  res.send({ poslate: 'poslate' });
});

//  this function is used to check colisions
router.post('/checkCollisionsMA', function (req, res) {
  gameService.checkCollisionsMA();
  res.send({ poslate: 'poslate' });
});

//  this function is used to change level to the next level
router.post('/nextLevel', function (req, res) {
  gameService.nextLevel();
  gameService.resetMissilesShip();
  res.send({ poslate: 'poslate' });
});

//  this function is used to reset game to the begining
router.post('/resetButton', function (req, res) {
  gameService.resetAll();
  res.send({ poslate: 'poslate' });
});

//  this function is used to show register
router.post('/showRegisterForm', function (req, res) {
  res.json(gameService.getRegistrationJson());
});

//  this function is to show login
router.post('/showLogin', function (req, res) {
  res.json(gameService.getLoginJson());
});

//  this function add pin to the session
router.post('/addPinSession', function (req, res) {
  hraPriradena = true;
  if (req.session.pin == undefined) {
    var pin = Math.floor(1000 + Math.random() * 9000);
    req.session.pin = pin;
  }

  // set correct gameService
  var gameServices = require('../services/gameService');

  najdene = false;
  for (let i = 0; i < gameServices.length; i++) {
    if (gameServices[i].pin == req.session.pin) {
      // nasiel som svoj game service ktory chcem mat
      gameService = gameServices[i];
      najdene = true;
      break;
    }
  }
  // druha moznost nenajdem game service

  if (najdene == false) {
    for (let i = 0; i < gameServices.length; i++) {
      if (hraPriradena) {
        if (gameServices[i].pin == 0) {
          // vytvor novu hru a namapuj na pin
          gameServices[i].pin = req.session.pin;
          gameService = gameServices[i];
          hraPriradena = false;

          break;
        }
      }
    }
  }

  res.json({ gameService: gameService });
});

//  this function is to get all games
router.post('/getAllGames', async function (req, res) {
  let games = await gameService.getAllGames(req.session);
  res.json({ games: games });
});

//  this function is to get all games except my game
router.post('/getAllGamesMinusMyGame', async function (req, res) {
  let games = await gameService.getAllGamesMinusMyGame(req.session);
  res.json({ games: games });
});

//  this function is to get all games
router.post('/getGameByPin', async function (req, res) {
  let game = await gameService.getGameByPin(req.body.pin);
  res.json({ game: game });
});

//  this functions moves left
router.post('/moveLeft', async function (req, res) {
  gameService.moveLeft(req.body.pin);
  res.json({ poslane: 'poslane' });
});

//  this functions moves fire
router.post('/moveFire', async function (req, res) {
  gameService.moveFire(req.body.pin);
  res.json({ poslane: 'poslane' });
});

//  this functions moves right
router.post('/moveRight', async function (req, res) {
  gameService.moveRight(req.body.pin);
  res.json({ poslane: 'poslane' });
});

//  this functions gets all games
router.post('/getAllGamesReal', async function (req, res) {
  let games = await gameService.getAllGamesReal();
  res.json({ games: games });
});

//export this router to use in our index.js
module.exports = router;
