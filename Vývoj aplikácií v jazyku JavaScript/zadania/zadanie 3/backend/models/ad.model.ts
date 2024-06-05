export = (sequelize: any, Sequelize: any) => {
  const Ad = sequelize.define("ad", {
    // Model attributes are defined here
    link: {
      type: Sequelize.STRING,
      // allowNull: false
    },
    picture: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    counter: {
      type: Sequelize.INTEGER,
      // allowNull defaults to true
    },
  });

  return Ad;
};
