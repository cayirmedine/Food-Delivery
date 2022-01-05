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

        calorie: {
            type: Sequelize.DOUBLE,
        },

        description: {
            type: Sequelize.STRING,
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return food;
  };
  