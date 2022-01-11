module.exports = (sequelize, Sequelize) => {
  const address = sequelize.define(
    "Addresses",
    {
      addressTitle: {
        type: Sequelize.STRING,
      },

      town: {
        type: Sequelize.STRING,
      },

      neighbourhood: {
        type: Sequelize.STRING,
      },

      addressDetail: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return address;
};
