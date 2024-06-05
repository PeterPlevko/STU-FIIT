const dbConfig = require("../db.config.ts");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: "5432",

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.order = require("./order.model.ts")(sequelize, Sequelize);
db.product = require("./product.model.ts")(sequelize, Sequelize);
db.orderItem = require("./orderItem.ts")(sequelize, Sequelize);
db.ad = require("./ad.model.ts")(sequelize, Sequelize);
module.exports = db;
