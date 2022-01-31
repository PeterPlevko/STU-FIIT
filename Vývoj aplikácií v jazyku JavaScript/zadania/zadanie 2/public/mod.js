// Peter Plevko
document.title = 'Vesmirna hra';
var ws = new WebSocket('ws://localhost:8082');
var running = false;
var sending;
let aliens;
let ship;
let missiles;
let level = 1;
let speed = 512;
let state;

let gameTitle = document.createElement('h1');
gameTitle.textContent = 'Vesmirna hra';
document.body.appendChild(gameTitle);

let maxScore = document.createElement('h1');
maxScore.textContent = 'Max skore: 0';
maxScore.id = 'globalScoreH1';
document.body.appendChild(maxScore);

let maxLevel = document.createElement('h1');
maxLevel.textContent = 'Max level: 0';
maxLevel.id = 'globalLevelH1';
document.body.appendChild(maxLevel);

let space = document.createElement('div');
space.id = 'space';
document.body.appendChild(space);

let canvas = document.createElement('CANVAS');
const ctx = canvas.getContext('2d');

let link = document.createElement('link');
link.rel = 'shortcut icon';
link.href = '#';
document.head.appendChild(link);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const product = urlParams.get('DEBUG'); // &DEBUG=true
let debugMode;
if (product === 'true') {
  debugMode = 1;
} else {
  debugMode = 0;
}

let resetBtn = document.createElement('button');
resetBtn.innerHTML = 'reset';
resetBtn.id = 'resetBtn';
space.innerHTML = '';
space.appendChild(canvas);

let globalScore = 0;
let score = document.createElement('h1');
score.id = 'score';
score.textContent = 'score: ' + globalScore;
space.appendChild(score);

let levelH1 = document.createElement('h1');
levelH1.id = 'level';
levelH1.textContent = 'level: ' + level;
space.appendChild(levelH1);

// create prihalseny pouzivatel
let loggedIn = document.createElement('h1');
loggedIn.id = 'loggedIn';
loggedIn.textContent = 'prihlaseny je pouzivatel: neprihlaseny';
space.appendChild(loggedIn);
// create prihlaseny pouzivatel

// here starts the function
initSpace();
function initSpace() {
  canvas.width = 528;
  canvas.height = 528;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 528, 528);
}

function drawSpace() {
  let background = new Image();
  background.src =
    'https://images.pexels.com/photos/3648850/pexels-photo-3648850.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
  // https://www.pexels.com/photo/white-and-black-light-streaks-3648850/ copiright
  background.onload = function () {
    ctx.drawImage(background, 0, 0, 528, 528);
  };
}

function drawAliens() {
  aliens.forEach(alien => {
    let x;
    let y;
    x = alien % 11;
    y = Math.floor(alien / 11);

    let base_image = new Image();
    base_image.src =
      'https://cdn.pixabay.com/photo/2020/01/19/15/02/ufo-4778062_960_720.png';
    // https://pixabay.com/vectors/ufo-alien-ship-spaceship-alien-4778062/ copiright
    base_image.onload = function () {
      ctx.drawImage(base_image, x * 48, y * 48, 48, 48);
    };
  });
}

function drawShip() {
  ship.forEach(s => {
    let x;
    let y;
    x = s % 11;
    y = Math.floor(s / 11);

    let base_image = new Image();
    base_image.src =
      'https://image.shutterstock.com/shutterstock/photos/1436378753/display_1500/stock-vector-spaceship-pixel-art-style-rocket-launch-pixel-art-spaceship-in-retro-style-bit-pixel-art-eps-1436378753.jpg';
    // https://www.shutterstock.com/image-vector/spaceship-pixel-art-style-rocket-launch-1436378753 copiright
    base_image.onload = function () {
      ctx.drawImage(base_image, x * 48, y * 48, 48, 48);
    };
  });
}

function drawMissiles() {
  missiles.forEach(missile => {
    let x;
    let y;
    x = missile % 11;
    y = Math.floor(missile / 11);

    let base_image = new Image();
    base_image.src =
      'https://cdn.pixabay.com/photo/2013/07/12/13/52/rocket-147466_960_720.png';
    // https://pixabay.com/vectors/rocket-spaceship-space-shuttle-nasa-147466/ copiright
    base_image.onload = function () {
      ctx.drawImage(base_image, x * 48, y * 48, 48, 48);
    };
  });
}

// vyhral som
function win() {
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 528, 528);
  ctx.stroke();
}

function loose() {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 528, 528);
  ctx.stroke();
}

// pridava ovladanie wasd
function checkKey(e) {
  e = e || window['event'];

  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keyCode: e.keyCode }),
  };

  let myRequest = new Request('http://localhost:8080/game/checkKey');
  fetch(myRequest, myInit).then(function (response) {
    response.json().then(data => {});
  });
}

// create start
function createStartButton() {
  let btnStart = document.createElement('button');
  btnStart.innerHTML = 'Start';
  btnStart.id = 'start';
  btnStart.addEventListener('click', function () {
    /*     e.preventDefault();
    e.stopPropagation(); */
    if (!running) gameLoop();
  });

  document.body.appendChild(btnStart);
}
createStartButton();
// create start

function playMusic() {
  let music = document.createElement('AUDIO');

  music.src = 'https://www.bensound.com/bensound-music/bensound-dubstep.mp3';
  // https://www.bensound.com/royalty-free-music/track/dubstep copiright
  music.id = 'music';
  let btn = document.createElement('button');
  btn.innerHTML = 'Music';

  btn.addEventListener('click', function () {
    let audio = document.getElementById('music');
    if (audio.paused === true) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  document.body.appendChild(btn);
  document.body.appendChild(music);
}
playMusic();

function changeScore() {
  document.getElementById('score').textContent = 'score: ' + globalScore;
}

function changeLevel() {
  document.getElementById('level').textContent = 'level: ' + level;
}

resetBtn.addEventListener('click', function () {
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  };

  let myRequest = new Request('http://localhost:8080/game/resetButton');
  fetch(myRequest, myInit).then(function (response) {
    response.json().then(data => {});
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 528, 528);
    ctx.stroke();
    document.getElementById('score').textContent = 'score: 0';
    document.getElementById('level').textContent = 'level: 1';
    clearInterval(sending);
    running = false;
    document.getElementById('start').disabled = false;
  });
});
async function changeSessionPin() {
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  };

  let myRequest = new Request('http://localhost:8080/game/addPinSession');

  let response = await fetch(myRequest, myInit);
  return response;
}
changeSessionPin(); // potrebujem to mat tu inak sa to pokazi

async function gameLoop() {
  // vstupil som do game loop a nemam hraca tak si hraca vytvorim
  let flag;
  let somPrihlaseny = document.getElementById('loggedIn').textContent;
  const myArray = somPrihlaseny.split(' ');
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i] == 'neprihlaseny') {
      flag = true;
    }
  }
  if (flag) {
    const myInit = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    };

    let myRequest = new Request('http://localhost:8080/user/addGuest');

    let response1 = await fetch(myRequest, myInit);

    let responseJSON = await response1.json();

    var loggedH1 = document.getElementById('loggedIn');

    loggedH1.textContent =
      'prihlaseny je pouzivatel: ' + responseJSON.user.login;
    // vstupil som do game loop a nemam hraca tak si hraca vytvorim
  }

  let response = await changeSessionPin();
  clearInterval(sending);
  response.json().then(data => {
    sending = setInterval(function () {
      ws.send(JSON.stringify(data.gameService));
    }, speed);

    running = true;
    document.addEventListener('keydown', checkKey);
  });
}

document.getElementById('start').addEventListener('keydown', function (e) {
  e.preventDefault();
  e.stopPropagation();
});

ws.addEventListener('message', ({ data }) => {
  document.getElementById('start').disabled = true;
  aliens = JSON.parse(data).aliens;
  ship = JSON.parse(data).ship;
  missiles = JSON.parse(data).missiles;
  level = JSON.parse(data).level;
  speed = JSON.parse(data).speed;
  globalScore = JSON.parse(data).globalScore;
  state = JSON.parse(data).state;

  drawSpace();

  drawAliens();
  drawMissiles();
  drawShip();
  changeScore();
  changeLevel();

  setTimeout(() => {
    if (state === 'loss') {
      clearInterval(sending);
      running = false;
      loose();
      // ked prehram checkni global score
      checkGlobalVsLocalScore(globalScore);
      return;
    }
  }, 10);

  if (state === 'win') {
    clearInterval(sending);
    win();
    saveGameState(level, speed, globalScore);

    checkGlobalVsLocalLevel(level);
    setTimeout(function () {
      gameLoop();
    }, 1000);
  }
});

document.body.appendChild(resetBtn);

// sem zacinam robit zadanie 2 *********************************************************************************************************************************************
async function saveGameState(level, speed, score) {}
//show registration
let showRegisterButton = document.createElement('button');
showRegisterButton.textContent = 'show register';
showRegisterButton.id = 'showRegisterButton';

showRegisterButton.onclick = function () {
  if (document.getElementById('loginDiv') !== null) {
    document.getElementById('loginDiv').remove();
  }
  showRegisterFunction();
};

async function showRegisterFunction() {
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };

  let myRequest = new Request('http://localhost:8080/game/showRegisterForm');
  let response = await fetch(myRequest, myInit);

  let translatedResponse = translateJsonToHtml(await response.json());

  let div = document.createElement('div');
  div.id = 'registrationDiv';
  div.innerHTML = translatedResponse;
  document.body.appendChild(div);

  let regBTN = document.getElementById('registrationButton');
  document.getElementById('showRegisterButton').disabled = true;
  regBTN.onclick = function () {
    sendInformation();
  };
}
document.body.appendChild(showRegisterButton);
// show registration

// validate information
function validateEmail(email) {
  var re = /^\S+@\S+\.\S+$/;
  return re.test(email);
}
function validatePin(pin) {
  var re = /^[0-9]{4}$/;
  return re.test(pin);
}
function validateLogin(login) {
  var re = /^[A-Z\-a-z]$/;
  return re.test(login);
}
function validateFullName(name) {
  var re = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  return re.test(name);
}
function checkIfPasswordMatch(pass1, pass2) {
  return pass1 === pass2;
}
//validate information

// send information
async function sendInformation() {
  let flag;

  let email = document.getElementById('email').value;
  flag = validateEmail(email);

  let login = document.getElementById('login').value;
  flag = validateLogin(login);

  let password = document.getElementById('passWord').value;
  let password1 = document.getElementById('passWord1').value;
  flag = checkIfPasswordMatch(password, password1);

  let fullName = document.getElementById('fullName').value;
  flag = validateFullName(fullName);

  /*   let flag = true;
  let email = '1';
  let login = '1';
  let password = '1';
  let pin = '1';
  let fullname = '1'; */
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };

  let myRequest = new Request('http://localhost:8080/user/getAllUsers');
  let response = await fetch(myRequest, myInit);
  responseJSON = await response.json();

  responseJSON.forEach(element => {
    if (element.email == email || element.login == login) {
      flag = false;
    }
  });

  if (flag === true) {
    const myInit = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        login,
        password,
        fullName,
      }),
    };

    let myRequest = new Request('http://localhost:8080/user/addUser');
    let response = await fetch(myRequest, myInit);
    var loggedH1 = document.getElementById('loggedIn');

    loggedH1.textContent = 'prihlaseny je pouzivatel: neprihlaseny';

    let toBeRemove = document.getElementById('registrationDiv');
    toBeRemove.remove();
  }
  if (flag == false) {
    var loggedH1 = document.getElementById('loggedIn');

    loggedH1.textContent = 'nespravne registrovacie udaje skus znova';
  }
}
//send information

// return all users
async function getAllUsersIntoConsole() {
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };

  let myRequest = new Request('http://localhost:8080/user/getAllUsers');
  let response = await fetch(myRequest, myInit);
  responseJSON = await response.json();
  // vypise mi vsetkych hracov do konzoly
  console.log(responseJSON);
}

let showAllUsers = document.createElement('button');
showAllUsers.textContent = 'show all users console';
showAllUsers.onclick = function () {
  getAllUsersIntoConsole();
};
document.body.appendChild(showAllUsers);
// return all users

// json to html
function translateJsonToHtml(jsonObject) {
  let html = '';
  for (let i = 0; i < jsonObject.length; i++) {
    if (jsonObject[i].id !== undefined) {
      // ak je type password pridaj type do html
      if (jsonObject[i].type == 'password') {
        html += `<${jsonObject[i].tag} id=${jsonObject[i].id} type=${jsonObject[i].type}> ${jsonObject[i].text} </${jsonObject[i].tag}>`;
        // ak type nie je password nepridaj type do html
      } else {
        html += `<${jsonObject[i].tag} id=${jsonObject[i].id}> ${jsonObject[i].text} </${jsonObject[i].tag}>`;
      }
    } else {
      html += `<${jsonObject[i].tag}> ${jsonObject[i].text} </${jsonObject[i].tag}>`;
    }
  }
  return html;
}
// json to html

// show login
let showLoginButton = document.createElement('button');
showLoginButton.textContent = 'show login';
showLoginButton.id = 'showLoginButton';

showLoginButton.onclick = function () {
  if (document.getElementById('registrationDiv') !== null) {
    document.getElementById('registrationDiv').remove();
  }
  showLoginFunction();
};
async function showLoginFunction() {
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };

  let myRequest = new Request('http://localhost:8080/game/showLogin');
  let response = await fetch(myRequest, myInit);

  let translatedResponse = translateJsonToHtml(await response.json());

  let div = document.createElement('div');
  div.id = 'loginDiv';
  div.innerHTML = translatedResponse;
  document.body.appendChild(div);

  let loginButton = document.getElementById('loginButton');
  document.getElementById('showLoginButton').disabled = true;

  loginButton.onclick = function () {
    sendLogin();
  };
}
document.body.appendChild(showLoginButton);
//show login

// table
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement('th');
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}
//table

// send information
async function sendLogin() {
  let login = document.getElementById('Login').value;
  let passWord = document.getElementById('passWord').value;
  /*   let login = 'kuntox';
  let passWord = 'peterplevko'; */

  //sem mi zacina admin
  if (login == 'admin' && passWord == 'admin') {
    document.body.innerHTML = '';

    const myInit = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: login, passWord: passWord }),
    };

    let myRequest = new Request('http://localhost:8080/user/getAllUsers');

    let response = await fetch(myRequest, myInit);
    responseJSON = await response.json();

    let player = [
      {
        email: '',
        login: '',
        password: '',
        pin: '',
        fullname: '',
        maxScore: '',
        maxLevel: '',
      },
    ];

    // prepare data
    let newPlayers = [];
    for (let i = 0; i < responseJSON.length; i++) {
      let email = responseJSON[i].email;
      let login = responseJSON[i].login;
      let password = responseJSON[i].password;

      let pin = responseJSON[i].pin;
      let fullname = responseJSON[i].fullname;
      let maxScore = responseJSON[i].maxScore;
      let maxLevel = responseJSON[i].maxLevel;
      if (responseJSON[i].email == undefined) {
        email = '0';
      }
      if (responseJSON[i].fullname == undefined) {
        fullname = '0';
      }
      if (responseJSON[i].login == undefined) {
        login = '0';
      }
      if (responseJSON[i].maxLevel == undefined) {
        maxLevel = '0';
      }
      if (responseJSON[i].maxScore == undefined) {
        maxScore = '0';
      }
      if (responseJSON[i].password == undefined) {
        password = '0';
      }
      if (responseJSON[i].pin == undefined) {
        pin = '0';
      }
      let player = {
        email: email,
        login: login,
        password: password,
        pin: pin,
        fullname: fullname,
        maxScore: maxScore,
        maxLevel: maxLevel,
      };
      newPlayers.push(player);
    }

    let table = document.createElement('table');
    let data = Object.keys(player[0]);
    generateTableHead(table, data);
    generateTable(table, newPlayers);
    let text = document.createElement('H1');
    text.textContent = 'HRACI';
    document.body.appendChild(text);
    document.body.appendChild(table);

    // urob hry

    /// sem idem getovat hry
    const myInit1 = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    };

    let myRequest1 = new Request('http://localhost:8080/game/getAllGames');

    let response1 = await fetch(myRequest1, myInit1);
    responseJSON1 = await response1.json();
    responseJSON1 = responseJSON1.games;

    let game = [
      {
        globalScore: '',
        level: '',
        pin: '',
      },
    ];

    // prepare data
    let newGames = [];
    for (let i = 0; i < responseJSON1.length; i++) {
      let globalScore = responseJSON1[i].globalScore;
      let level = responseJSON1[i].level;
      let pin = responseJSON1[i].pin;

      if (responseJSON1[i].globalScore == undefined) {
        globalScore = '0';
      }
      if (responseJSON1[i].level == undefined) {
        level = '0';
      }
      if (responseJSON1[i].pin == undefined) {
        pin = '0';
      }

      let gameJson = {
        globalScore: globalScore,
        level: level,
        pin: pin,
      };
      newGames.push(gameJson);
    }

    let table1 = document.createElement('table');
    let data1 = Object.keys(game[0]);
    generateTableHead(table1, data1);
    generateTable(table1, newGames);
    text = document.createElement('H1');
    text.textContent = 'HRY';
    document.body.appendChild(text);
    document.body.appendChild(table1);

    //urob hry
    // sem idem urobit csv uvidime

    var headers = {
      email: 'email',
      login: 'login',
      password: 'password',
      pin: 'pin',
      fullname: 'fullname',
      maxScore: 'maxScore',
      maxLevel: 'maxLevel',
    };

    var fileTitle = 'players'; // or 'my-unique-title'

    let buttonCSV = document.createElement('button');
    buttonCSV.textContent = 'download csv';
    buttonCSV.onclick = function () {
      exportCSVFile(headers, newPlayers, fileTitle);
    };
    document.body.appendChild(buttonCSV);

    let buttonCSVimport = document.createElement('button');
    buttonCSVimport.textContent = 'import csv';
    buttonCSVimport.onclick = async function () {
      buttonCSVimport.textContent = 'importnute';
      const myInit2 = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: login, passWord: passWord }),
      };

      let myRequest2 = new Request('http://localhost:8080/user/loadCSV');

      let response2 = await fetch(myRequest2, myInit2);
      responseJSON2 = await response2.json();
    };
    document.body.appendChild(buttonCSVimport);
    return;
  }
  // sem mi konci admin

  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login: login, passWord: passWord }),
  };

  let myRequest = new Request('http://localhost:8080/user/checkLogin');

  let response = await fetch(myRequest, myInit);
  responseJSON = await response.json();

  var loggedH1 = document.getElementById('loggedIn');
  if (responseJSON.nouser == 'nouser') {
    loggedH1.textContent = 'nespravne prihlasovacie udaje skus znova';
  } else {
    loggedH1.textContent = 'prihlaseny je pouzivatel: ' + responseJSON.login;
    document.getElementById('showRegisterButton').disabled = true;
    let toBeremoved = document.getElementById('loginDiv');
    toBeremoved.remove();
  }
}
//send information

// update score
async function setMaxScore() {
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };

  let myRequest = new Request('http://localhost:8080/user/setMaxScore');

  let response = await fetch(myRequest, myInit);
}
// update score

/* let testBTN = document.createElement('button');
testBTN.textContent = 'test';

testBTN.onclick = function () {
  setMaxScore();
};
document.body.appendChild(testBTN); */

// sem porovnavam skore skore sa upravuje len ked uzivatel prehra
async function checkGlobalVsLocalScore(localScore) {
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ localScore: localScore }),
  };

  let myRequest = new Request('http://localhost:8080/user/setMaxScore');

  let response = await fetch(myRequest, myInit);
  responseJSON = await response.json();
  if (responseJSON.state == 'nezmenene') {
    // score is not changing
  } else {
    document.getElementById(
      'globalScoreH1',
    ).textContent = `Max skore: ${responseJSON.score}`;
  }
}
// sem porovnavam skore

// sem porovnavam skore skore sa upravuje len ak pouzivatel vyhra level
async function checkGlobalVsLocalLevel(localLevel) {
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ localLevel: localLevel }),
  };

  let myRequest = new Request('http://localhost:8080/user/setMaxLevel');

  let response = await fetch(myRequest, myInit);
  responseJSON = await response.json();
  if (responseJSON.state == 'nezmenene') {
    // score is not changing
  } else {
    document.getElementById(
      'globalLevelH1',
    ).textContent = `Max level: ${responseJSON.level}`;
  }
}

// get all games
//get all games
// zobraz zoznam hier a po kliknuti
let showAllGamesAndWatch = document.createElement('button');
showAllGamesAndWatch.textContent = 'show all games ';
showAllGamesAndWatch.id = 'show all games';
showAllGamesAndWatch.onclick = function () {
  showAllGames();
};

// get all games
async function showAllGames() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 528, 528);
  ctx.stroke();
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };

  let myRequest = new Request('http://localhost:8080/game/getAllGames');

  let response = await fetch(myRequest, myInit);
  responseJSON = await response.json();

  let check = document.getElementById('games');
  if (check !== null) {
    check.remove();
  }
  let div = document.createElement('div');
  div.id = 'games';
  let gameAndButton = document.createElement('div');
  for (let i = 0; i < responseJSON.games.length; i++) {
    let text = document.createElement('H1');
    text.id = i;
    text.textContent = responseJSON.games[i].pin;
    let button = document.createElement('button');
    button.textContent = 'pozerat';
    button.id = i;

    //skusim////////////////////////////
    document.body.appendChild(div);
    button.onclick = async function () {
      let prehral = false;
      sending1 = setInterval(async function () {
        let pin = document.getElementById(button.id).textContent;
        const myInit = {
          method: 'POST',
          mode: 'cors',
          cache: 'default',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin: pin }),
        };

        let myRequest = new Request('http://localhost:8080/game/getGameByPin');

        let response = await fetch(myRequest, myInit);
        responseJSON = await response.json();

        ///////////////////// sem zacinam kreslit

        if (prehral == false) {
          let background = new Image();
          background.src =
            'https://images.pexels.com/photos/3648850/pexels-photo-3648850.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
          // https://www.pexels.com/photo/white-and-black-light-streaks-3648850/ copiright
          background.onload = function () {
            ctx.drawImage(background, 0, 0, 528, 528);
          };

          responseJSON.game.aliens.forEach(alien => {
            let x;
            let y;
            x = alien % 11;
            y = Math.floor(alien / 11);

            let base_image = new Image();
            base_image.src =
              'https://cdn.pixabay.com/photo/2020/01/19/15/02/ufo-4778062_960_720.png';
            // https://pixabay.com/vectors/ufo-alien-ship-spaceship-alien-4778062/ copiright
            base_image.onload = function () {
              ctx.drawImage(base_image, x * 48, y * 48, 48, 48);
            };
          });

          responseJSON.game.ship.forEach(s => {
            let x;
            let y;
            x = s % 11;
            y = Math.floor(s / 11);

            let base_image = new Image();
            base_image.src =
              'https://image.shutterstock.com/shutterstock/photos/1436378753/display_1500/stock-vector-spaceship-pixel-art-style-rocket-launch-pixel-art-spaceship-in-retro-style-bit-pixel-art-eps-1436378753.jpg';
            // https://www.shutterstock.com/image-vector/spaceship-pixel-art-style-rocket-launch-1436378753 copiright
            base_image.onload = function () {
              ctx.drawImage(base_image, x * 48, y * 48, 48, 48);
            };
          });
          responseJSON.game.missiles.forEach(missile => {
            let x;
            let y;
            x = missile % 11;
            y = Math.floor(missile / 11);

            let base_image = new Image();
            base_image.src =
              'https://cdn.pixabay.com/photo/2013/07/12/13/52/rocket-147466_960_720.png';
            // https://pixabay.com/vectors/rocket-spaceship-space-shuttle-nasa-147466/ copiright
            base_image.onload = function () {
              ctx.drawImage(base_image, x * 48, y * 48, 48, 48);
            };
          });
          if (responseJSON.game !== undefined) {
            if (responseJSON.game.state == 'loss') {
              setTimeout(() => {
                clearInterval(sending1);
                prehral = true;

                ctx.fillStyle = 'red';
                ctx.fillRect(0, 0, 528, 528);
                ctx.stroke();
                prehral = true;
                clearInterval(sending1);
                return;
              }, 10);
            }
            if (responseJSON.game.state == 'win') {
              ctx.fillStyle = 'green';
              ctx.fillRect(0, 0, 528, 528);
              ctx.stroke();
            }
          }
        }
      }, speed);
      if (prehral == true) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 528, 528);
        ctx.stroke();
      }
    };

    ///////////////////////////////////////////////

    gameAndButton.appendChild(text);
    gameAndButton.appendChild(button);

    // skusim
  }

  div.appendChild(gameAndButton);
}

document.body.appendChild(showAllGamesAndWatch);

// zobraz zoznam hier a po kliknuti
let remoteGame = document.createElement('button');
remoteGame.textContent = 'play remote game';
remoteGame.id = 'playRemoteGame';
remoteGame.onclick = function () {
  playRemoteGame();
};

// get all games
async function playRemoteGame() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 528, 528);
  ctx.stroke();
  const myInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };

  let myRequest = new Request(
    'http://localhost:8080/game/getAllGamesMinusMyGame',
  );

  let response = await fetch(myRequest, myInit);
  responseJSON = await response.json();

  let div = document.createElement('div');
  div.id = 'games';
  let gameAndButton = document.createElement('div');
  gameAndButton.id = 'ovladanieatext';

  let check1 = document.getElementById('ovladanieatext');
  if (check1 !== null) {
    check1.remove();
  }

  let check = document.getElementById('games');
  if (check !== null) {
    check.remove();
  }

  for (let i = 0; i < responseJSON.games.length; i++) {
    let text = document.createElement('H1');
    text.id = i;
    text.textContent = responseJSON.games[i].pin;
    let button = document.createElement('button');
    button.textContent = 'ovladat';
    button.id = i;
    document.body.appendChild(div);

    button.onclick = async function () {
      let pin = document.getElementById(button.id).textContent;

      const myInit = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin: pin }),
      };

      let myRequest = new Request('http://localhost:8080/game/getGameByPin');
      let response = await fetch(myRequest, myInit);
      responseJSON = await response.json();

      // sem vlozim ovladanie
      if (document.getElementById('ovladanie') !== null) {
        document.getElementById('ovladanie').remove();
      } else {
        let ovladanie = document.createElement('div');
        ovladanie.id = 'ovladanie';

        let button1 = document.createElement('button');
        button1.textContent = 'left';
        button1.id = 'left';
        button1.onclick = async function () {
          const myInit = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pin: pin }),
          };

          let myRequest = new Request('http://localhost:8080/game/moveLeft');
          let response = await fetch(myRequest, myInit);
          responseJSON = await response.json();
        };

        let button2 = document.createElement('button');
        button2.textContent = 'fire';
        button2.id = 'fire';
        button2.onclick = async function () {
          const myInit = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pin: pin }),
          };

          let myRequest = new Request('http://localhost:8080/game/moveFire');
          let response = await fetch(myRequest, myInit);
          responseJSON = await response.json();
        };

        let button3 = document.createElement('button');
        button3.textContent = 'right';
        button3.id = 'right';
        button3.onclick = async function () {
          const myInit = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pin: pin }),
          };

          let myRequest = new Request('http://localhost:8080/game/moveRight');
          let response = await fetch(myRequest, myInit);
          responseJSON = await response.json();
        };

        ovladanie.appendChild(button1);
        ovladanie.appendChild(button2);
        ovladanie.appendChild(button3);
        document.getElementById('games').appendChild(ovladanie);
      }
    };

    gameAndButton.appendChild(text);
    gameAndButton.appendChild(button);
  }

  div.appendChild(gameAndButton);
}

document.body.appendChild(remoteGame);

// csv
function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ',';

      line += array[i][index];
    }

    str += line + '\r\n';
  }

  return str;
}

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = this.convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement('a');
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
