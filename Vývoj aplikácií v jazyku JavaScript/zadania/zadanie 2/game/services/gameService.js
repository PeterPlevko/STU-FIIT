// Peter Plevko
class GameService {
  // ctrl d alt posuvam riadky  shift alt zduplikuje
  // draw funkcie nechavam tak a menim logiku len move funkciam
  aliens = [1, 3, 5, 7, 9, 23, 25, 27, 29, 31];
  ship = [104, 114, 115, 116];
  missiles = [];
  globalScore = 0;
  direction = 1;
  collision = false;
  level = 1;
  speed = 512;
  a = 0;
  pin = 0;
  state = 'nehram';

  getLevel() {
    return this.level;
  }
  resetAliens() {
    this.aliens = [1, 3, 5, 7, 9, 23, 25, 27, 29, 31];
  }
  resetAll() {
    this.aliens = [1, 3, 5, 7, 9, 23, 25, 27, 29, 31];
    this.ship = [104, 114, 115, 116];
    this.missiles = [];
    this.globalScore = 0;
    this.direction = 1;
    this.collision = false;
    this.level = 1;
    this.speed = 512; //512;
    this.a = 0;
    this.state = 'game stop';
  }
  moveAliens() {
    this.state = '';
    var i = 0;
    for (i = 0; i < this.aliens.length; i++) {
      this.aliens[i] = this.aliens[i] + this.direction;
    }
    this.direction *= -1;
  }
  lowerAliens() {
    var i = 0;
    for (i = 0; i < this.aliens.length; i++) {
      this.aliens[i] += 11;
    }
  }

  moveMissiles() {
    var i = 0;
    for (i = 0; i < this.missiles.length; i++) {
      this.missiles[i] -= 11;
      if (this.missiles[i] < 0) this.missiles.splice(i, 1);
    }
  }

  checkKey(e) {
    if (e.keyCode == '37') {
      if (this.ship[0] > 100) {
        for (let i = 0; i < this.ship.length; i++) {
          this.ship[i]--;
        }
      }
    } else if (e.keyCode == '39' && this.ship[0] < 108) {
      for (let i = 0; i < this.ship.length; i++) {
        this.ship[i]++;
      }
    } else if (e.keyCode == '32') {
      this.missiles.push(this.ship[0] - 11);
    }

    //wasd
    else if (e.keyCode == '65') {
      if (this.ship[0] > 100) {
        for (let i = 0; i < this.ship.length; i++) {
          this.ship[i]--;
        }
      }
    } else if (e.keyCode == '68' && this.ship[0] < 108) {
      for (let i = 0; i < this.ship.length; i++) {
        this.ship[i]++;
      }
    } else if (e.keyCode == '87') {
      this.missiles.push(this.ship[0] - 11);
    }
  }

  checkCollisionsMA() {
    for (let i = 0; i < this.missiles.length; i++) {
      if (this.aliens.includes(this.missiles[i])) {
        this.globalScore += 10;

        let alienIndex = this.aliens.indexOf(this.missiles[i]);
        this.aliens.splice(alienIndex, 1);
        this.missiles.splice(i, 1);
      }
    }
  }

  RaketaKolidujeSVotrelcom() {
    for (var i = 0; i < this.aliens.length; i++) {
      if (this.aliens[i] > 98) {
        this.collision = true;
        return;
      }
    }
    this.collision = false;
  }

  nextLevel() {
    this.level++;

    if (this.level == 1) this.aliens = [1, 3, 5, 7, 9, 23, 25, 27, 29, 31];
    if (this.level == 2)
      this.aliens = [1, 3, 5, 7, 9, 13, 15, 17, 19, 23, 25, 27, 29, 31];
    if (this.level == 3) this.aliens = [1, 5, 9, 23, 27, 31];
    if (this.level == 4) this.aliens = [45, 53];
    if (this.level > 4) {
      this.level = 1;
      this.aliens = [1, 3, 5, 7, 9, 23, 25, 27, 29, 31];
      this.speed = this.speed / 2;
    }
  }

  getParam() {
    this.a++;
    let state = 'run';
    this.moveAliens();
    this.moveMissiles();
    this.checkCollisionsMA();
    if (this.a % 4 == 3) this.lowerAliens();

    this.RaketaKolidujeSVotrelcom(); // game service returns collision
    if (this.collision) {
      state = 'loss';
      this.state = 'loss';
    }

    if (this.aliens.length === 0) {
      this.missiles = [];
      this.ship = [104, 114, 115, 116];
      this.nextLevel();
      state = 'win';
    }

    return {
      ship: this.ship,
      missiles: this.missiles,
      aliens: this.aliens,
      speed: this.speed,
      globalScore: this.globalScore,
      level: this.level,
      state: state,
    };
  }

  getRegistrationJson() {
    var register = [
      { tag: 'h1', text: 'Registration' },

      { tag: 'label', text: 'email' },

      {
        tag: 'input',
        type: 'text',
        id: 'email',
        text: '',
      },

      { tag: 'label', text: 'login' },

      {
        tag: 'input',
        type: 'text',
        id: 'login',
        text: '',
      },

      { tag: 'label', text: 'heslo' },

      {
        tag: 'input',
        type: 'password',
        id: 'passWord',
        text: '',
      },

      { tag: 'label', text: 'potvrd heslo' },

      {
        tag: 'input',
        type: 'password',
        id: 'passWord1',
        text: '',
      },

      { tag: 'label', text: 'cele meno' },

      {
        tag: 'input',
        type: 'text',
        id: 'fullName',
        text: '',
      },

      {
        tag: 'button',
        type: 'text',
        id: 'registrationButton',
        text: 'registrovat',
      },
    ];
    return register;
  }

  getLoginJson() {
    var login = [
      { tag: 'h1', text: 'Login' },

      { tag: 'label', text: 'Login' },

      {
        tag: 'input',
        type: 'text',
        id: 'Login',
        text: '',
      },

      { tag: 'label', text: 'Heslo' },

      {
        tag: 'input',
        type: 'password',
        id: 'passWord',
        text: '',
      },

      {
        tag: 'button',
        type: 'text',
        id: 'loginButton',
        text: 'prihlasit',
      },
    ];
    return login;
  }
  loadSavedGame() {}

  addGame(game) {
    this.games.push({ game });
  }
  getAllGames(session) {
    let array = [];
    for (let i = 0; i < gameServiceArray.length; i++) {
      if (
        gameServiceArray[i].pin !== 0 &&
        gameServiceArray[i].state !== 'loss' &&
        gameServiceArray[i].state !== 'nehram' &&
        gameServiceArray[i].state !== 'game stop' &&
        gameServiceArray[i].pin !== session.pin
      ) {
        array.push(gameServiceArray[i]);
      }
    }
    return array;
  }
  getAllGamesReal() {
    return gameServiceArray;
  }

  getAllGamesMinusMyGame(session) {
    let array = [];
    for (let i = 0; i < gameServiceArray.length; i++) {
      if (
        gameServiceArray[i].pin !== 0 &&
        gameServiceArray[i].state !== 'loss' &&
        gameServiceArray[i].state !== 'nehram' &&
        gameServiceArray[i].state !== 'game stop' &&
        gameServiceArray[i].pin !== session.pin
      ) {
        array.push(gameServiceArray[i]);
      }
    }
    return array;
  }

  getGameByPin(pin) {
    for (let i = 0; i < gameServiceArray.length; i++) {
      if (gameServiceArray[i].pin == pin) {
        return gameServiceArray[i];
      }
    }
  }
  moveLeft(pin) {
    for (let i = 0; i < gameServiceArray.length; i++) {
      if (gameServiceArray[i].pin == pin) {
        // pohni lodou
        if (gameServiceArray[i].ship[0] > 100) {
          for (let j = 0; j < gameServiceArray[i].ship.length; j++) {
            gameServiceArray[i].ship[j]--;
          }
        }
        // pohni lodou
      }
    }
  }
  moveFire(pin) {
    for (let i = 0; i < gameServiceArray.length; i++) {
      if (gameServiceArray[i].pin == pin) {
        // pohni lodou
        gameServiceArray[i].missiles.push(gameServiceArray[i].ship[0] - 11);
      }

      // pohni lodou
    }
  }
  moveRight(pin) {
    for (let i = 0; i < gameServiceArray.length; i++) {
      if (gameServiceArray[i].pin == pin) {
        // pohni lodou
        if (gameServiceArray[i].ship[0] < 108) {
          for (let j = 0; j < gameServiceArray[i].ship.length; j++) {
            gameServiceArray[i].ship[j]++;
          }
        }
        // pohni lodou
      }
    }
  }
}

gameServiceArray = new Array();

// bralo mi to tento gameservice
for (let i = 0; i < 1000; i++) {
  gameServiceArray.push(new GameService());
}

module.exports = gameServiceArray;

/* gameService = new GameService();
module.exports = gameService; */
