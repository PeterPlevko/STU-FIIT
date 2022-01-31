// testy zbehnu vsetky uspesne len ak su pustene ako prva vec

import express from "express";
import { Sequelize } from "sequelize/dist";
import eshopRouting from "./eshop/controllers/eshopController";
import { DataTypes } from "sequelize";
var cors = require("cors");

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

app.use(express.json());
app.use(cors());

// tuto zacinam s programom  -------------------------------------------------

const db = require("./models");
const Product = db.product;

db.sequelize.sync({ force: true }).then(() => {
  Product.create({
    name: "kitare",
    price: "20",
    picture:
      "https://cdn.pixabay.com/photo/2013/07/12/15/06/guitar-149427_960_720.png",
  }).then();
  Product.create({
    name: "Rumba balz",
    price: "52",
    picture:
      "https://cdn.pixabay.com/photo/2020/11/17/12/51/maracas-5752261_960_720.png",
  }).then();
  Product.create({
    name: "flaute",
    price: "150",
    picture:
      "https://cdn.pixabay.com/photo/2016/03/29/10/38/saxophone-1287911_960_720.png",
  }).then();
  // here i add ad
  const Ad = db.ad;
  Ad.create({
    link: "https://www.fiit.stuba.sk/",
    picture:
      "https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_960_720.jpg",
    counter: 0,
  }).then();
});

// sem idem robit routing
app.use("/eshop", eshopRouting);
