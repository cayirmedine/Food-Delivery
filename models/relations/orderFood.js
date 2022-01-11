module.exports = (sequelize, Sequelize) => {
    const orderFood = sequelize.define(
      "OrderFoodRelation",
      {
        
      },
      {
        freezeTableName: true,
      }
    );
    return orderFood;
  };