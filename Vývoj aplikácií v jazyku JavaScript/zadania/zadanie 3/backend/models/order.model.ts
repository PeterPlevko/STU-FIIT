export = (sequelize: any, Sequelize: any) => {
  const Order = sequelize.define("Order", {
    // Model attributes are defined here
    state: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    email: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    meno: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    ulica: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    cislo: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    mesto: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    psc: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
  });

  return Order;
};
