module.exports = (sequelize, Sequelize) => {
  var fav = sequelize.define(
    "Favorites",
    {},
    {
      freezeTableName: true,
    }
  );

  return fav;
};
