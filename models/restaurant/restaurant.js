module.exports = (sequelize, Sequelize) => {
  var restaurant = sequelize.define(
    "Restaurants",
    {
      title: {
        type: Sequelize.STRING,
      },
      photoLink: {
        type: Sequelize.STRING,
      },

      photoType: {
        type: Sequelize.STRING,
      },

      photoSize: {
        type: Sequelize.DOUBLE,
      },

      deliveryTime: {
        type: Sequelize.STRING,
      },

      rating: {
        type: Sequelize.DOUBLE,
        defaultValue: "0.0",
      },

      priceRating: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return restaurant;
};
