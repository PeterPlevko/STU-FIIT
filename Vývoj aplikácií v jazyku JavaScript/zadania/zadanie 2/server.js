// Peter Plevko
const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8082 });
var gameRouting = require('./game/controllers/gameRouting.js');
var userRouting = require('./user/controller/userRouting.js');

var session = require('express-session');
let oneDay = 86400;

wss.on('connection', ws => {
  console.log('New client connected');

  /*   ws.on('message', () => {
    ws.send(JSON.stringify(gameService.getParam()));
  }); */

  ws.onmessage = function (e) {
    var object = JSON.parse(e.data); // this is my sesion which i do want to play

    for (let i = 0; i < gameServiceArray.length; i++) {
      if (object.pin == gameServiceArray[i].pin) {
        myGame = gameServiceArray[i];
      }
    }

    ws.send(JSON.stringify(myGame.getParam()));
  };
});

// here i define sesion
app.use(
  session({
    secret: 'messie',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  }),
);

// here i define sesion

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use('/game', gameRouting);
app.use('/user', userRouting);

app.listen(3000);
