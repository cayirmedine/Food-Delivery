module.exports = (sequelize, Sequelize) => {
  const location = sequelize.define(
    "Location",
    {
      latitude: { type: Sequelize.DOUBLE },
      longitude: { type: Sequelize.DOUBLE },
    },
    {
      freezeTableName: true,
    }
  );

  return location;
};
