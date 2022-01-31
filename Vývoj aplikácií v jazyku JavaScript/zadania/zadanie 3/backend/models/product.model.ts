export = (sequelize: any, Sequelize: any) => {
  const product = sequelize.define("Product", {
    // Model attributes are defined here
    name: {
      type: Sequelize.STRING,
      // allowNull: false
    },
    picture: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    price: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
  });
  return product;
};
