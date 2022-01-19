module.exports = (sequelize, Sequelize) => {
  var comments = sequelize.define(
    "Comments",
    {
      content: {
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

  return comments;
};
