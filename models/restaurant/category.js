module.exports = (sequelize, Sequelize) => {
  var restaurantCat = sequelize.define(
    "Categories",
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
    },
    {
      freezeTableName: true,
    }
  );

  return restaurantCat;
};
