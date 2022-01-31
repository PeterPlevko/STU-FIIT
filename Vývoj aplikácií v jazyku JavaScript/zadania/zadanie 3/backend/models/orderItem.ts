export = (sequelize: any, Sequelize: any) => {
  const orderItem = sequelize.define("orderItem", {
    // Model attributes are defined here
    orderId: {
      type: Sequelize.INTEGER,
      // allowNull: false
    },
    productId: {
      type: Sequelize.INTEGER,
      // allowNull defaults to true
    },
    quantity: {
      type: Sequelize.INTEGER,
      // allowNull defaults to true
    },
  });

  return orderItem;
};
