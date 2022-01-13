module.exports = (sequelize, Sequelize) => {
    var food = sequelize.define(
      "Foods",
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

        unitPrice: {
            type: Sequelize.DOUBLE,
        },

        calories: {
            type: Sequelize.DOUBLE,
        },

        description: {
            type: Sequelize.STRING,
        },

        rating: {
          type: Sequelize.DOUBLE,
          defaultValue: "0.0",
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return food;
  };
  