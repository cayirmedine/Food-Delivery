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
            type: Sequelize.INTEGER,
        },

        rating: {
            type: Sequelize.DOUBLE,
        },

        priceRating: {
            type: Sequelize.STRING,
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return restaurant;
  };
  