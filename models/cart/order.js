module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define(
      "Orders",
      {
        paymentMethod: {
          type: Sequelize.STRING,
        },
  
        basketCost: {
          type: Sequelize.DOUBLE,
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return order;
  };
  