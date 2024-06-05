module.exports = {
  HOST: "postgres",
  USER: "root",
  PASSWORD: "password",
  DB: "eshop",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
