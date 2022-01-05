module.exports = (sequelize, Sequelize) => {
    var city = sequelize.define(
      "Cities",
      {
        cityName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      },
      {
        freezeTableName: true,
      }
    );
  
    return city;
  };