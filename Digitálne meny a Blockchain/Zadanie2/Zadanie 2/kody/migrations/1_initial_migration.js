const Migrations = artifacts.require("Migrations");
const ECDSA = artifacts.require("ECDSA");
const Battleship = artifacts.require("Battleship");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(ECDSA);
  deployer.deploy(Battleship);
};
