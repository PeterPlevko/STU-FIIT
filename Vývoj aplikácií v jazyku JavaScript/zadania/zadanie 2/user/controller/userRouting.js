// Peter Plevko
const { application } = require('express');
var express = require('express');
var router = express.Router();
var userService = require('../service/userService');

// this function adds user to the database
router.post('/addUser', function (req, res) {
  userService.addToUserArray(req.body);
  res.send({ uspech: 'uspech' });
});

// this function gets all users from database
router.post('/getAllUsers', function (req, res) {
  res.json(userService.getAllUsers());
});

//  this function is use to check login
router.post('/checkLogin', async function (req, res) {
  let loggedUser = await userService.checkLogin(req.body, req.session);

  if (loggedUser == undefined) {
    res.json({ nouser: 'nouser' });
  } else {
    res.json(loggedUser);
  }
});

//  this function is use to update score
router.post('/setMaxScore', async function (req, res) {
  let score = await userService.setMaxScore(req.body.localScore, req.session);
  if (score == undefined) {
    res.json({ state: 'nezmenene' });
  } else {
    res.json({ score: score });
  }
});

//  this function is use to update level
router.post('/setMaxLevel', async function (req, res) {
  let level = await userService.setMaxLevel(req.body.localLevel, req.session);
  if (level == undefined) {
    res.json({ state: 'nezmenene' });
  } else {
    res.json({ level: level });
  }
});

//  this function is used to add guest player
router.post('/addGuest', function (req, res) {
  let user = userService.getGuest(req.session);
  res.json({ user: user });
});

//  this function is used to import csv data
router.post('/loadCSV', async function (req, res) {
  let data = await userService.loadCSV();
  res.json({ poslate: 'poslate' });
});

//export this router to use in our index.js
module.exports = router;
