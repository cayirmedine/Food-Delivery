module.exports = (sequelize, Sequelize) => {
    const restaurantCat = sequelize.define(
      "RestaurantCatRelation",
      {
        
      },
      {
        freezeTableName: true,
      }
    );
    return restaurantCat;
  };