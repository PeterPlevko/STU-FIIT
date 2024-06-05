// Peter Plevko
const csvFilePath = `${__dirname}/../../players.csv`;
const csv = require('csvtojson');
// path to csv
var bcrypt = require('bcryptjs');
const { use } = require('passport');
class UserService {
  userArray = [
    {
      email: 'pplevko@gmail.com',
      fullname: 'Peter Plevko',
      login: 'kuntox',
      maxLevel: 0,
      maxScore: 0,
      password: '$2a$10$1KTtiQ4NwqdoDqAa0npcteuS.gp/GhriyVB82S.un/Q6H0HU5glUO',
      pin: 0,
    },
    {
      email: 'guest@gmail.com',
      fullname: 'Guest Guest',
      login: 'guest',
      maxLevel: 0,
      maxScore: 0,
      password: '$2a$10$FsQya4VjLiWpkXJtgGMA8.W/GFzCDpq5zTwYRKSSbJIhK.kpyhqky',
      pin: 0,
    },
    {
      email: 'ads@gmail.com',
      fullname: 'Jozko Tribula',
      login: 'peterbos',
      maxLevel: 0,
      maxScore: 0,
      password: '$2a$10$ftoqGpLrMDEL.s7zCW5nQu/Nq7j1NcCW93XxoxYwxEaVE7zkvAyMy',
      pin: 0,
    },
  ];

  addToUserArray(user) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    const myUser = {
      email: user.email,
      login: user.login,
      password: hash,
      fullname: user.fullName,
      maxScore: 0,
      maxLevel: 0,
      pin: 0,
    };
    this.userArray.push(myUser);
  }
  getAllUsers() {
    return this.userArray;
  }
  async checkLogin(body, sesion) {
    let doMatch;
    let loggedUser;

    for (let i = 0; i < this.userArray.length; i++) {
      doMatch = await bcrypt.compare(body.passWord, this.userArray[i].password); // nemozem mat console log za await

      // here ends checking of password
      if (this.userArray[i].login == body.login && doMatch == true) {
        sesion.user = this.userArray[i];

        return this.userArray[i];
      }
    }
  }
  setMaxScore(score, session) {
    if (session.user !== undefined) {
      if (session.user.maxScore !== undefined) {
        if (session.user.maxScore < score) {
          session.user.maxScore = score;
          for (let i = 0; i < this.userArray.length; i++) {
            if (session.user.login == this.userArray[i].login) {
              this.userArray[i].maxScore = score;
              return score;
            }
          }
        }
      }
    }
  }
  setMaxLevel(level, session) {
    if (session.user !== undefined) {
      if (session.user.maxLevel !== undefined) {
        if (session.user.maxLevel < level) {
          session.user.maxLevel = level;
          for (let i = 0; i < this.userArray.length; i++) {
            if (session.user.login == this.userArray[i].login) {
              this.userArray[i].maxLevel = level;
              return level;
            }
          }
        }
      }
    }
  }
  getGuest(session) {
    for (let i = 0; i < this.userArray.length; i++) {
      if (this.userArray[i].login == 'guest') {
        session.user = this.userArray[i];
        return this.userArray[i];
      }
    }

    //session.user=
  }

  async loadCSV() {
    const jsonArray = await csv().fromFile(csvFilePath);
    this.userArray = jsonArray;
  }
}

userService = new UserService();
module.exports = userService;
