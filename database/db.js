var Sequelize = require("sequelize");

var dotenv = require("dotenv");
dotenv.config();

var sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

//Auth Models
const user = require("../models/auth/user");

//Restaurant Models
const restaurantCat = require("../models/restaurant/category");
const restaurant = require("../models/restaurant/restaurant");
const food = require("../models/restaurant/foods");

//Common Models
const address = require("../models/common/address");
const city = require("../models/common/city");
const fav = require("../models/common/favorites");

//Cart Models
const order = require("../models/cart/order");

const userModel = user(sequelize, Sequelize);
const restaurantCatModel = restaurantCat(sequelize, Sequelize);
const restaurantModel = restaurant(sequelize, Sequelize);
const foodModel = food(sequelize, Sequelize);
const addressModel = address(sequelize, Sequelize);
const cityModel = city(sequelize, Sequelize);
const favModel = fav(sequelize, Sequelize);
const orderModel = order(sequelize, Sequelize);

addressModel.belongsTo(userModel, { foreignKey: "user_id" });
userModel.hasMany(addressModel, { foreignKey: "user_id" });
addressModel.belongsTo(restaurantModel, { foreignKey: "restaurant_id" });
restaurantModel.hasOne(addressModel, { foreignKey: "restaurant_id" });
addressModel.belongsTo(cityModel, { foreignKey: "city_id" });
cityModel.hasMany(addressModel, { foreignKey: "city_id" });
restaurantModel.belongsToMany(restaurantCatModel, {
  through: "Restaurant_Cat_Relation",
});
restaurantCatModel.belongsToMany(restaurantModel, {
  through: "Restaurant_Cat_Relation",
});
foodModel.belongsTo(restaurantModel, { foreignKey: "restaurant_id" });
restaurantModel.hasMany(foodModel, { foreignKey: "restaurant_id" });
favModel.belongsTo(userModel, { foreignKey: "user_id" });
userModel.hasMany(favModel, { foreignKey: "user_id" });
favModel.belongsTo(restaurantModel, { foreignKey: "restaurant_id" });
restaurantModel.hasMany(favModel, { foreignKey: "restaurant_id" });
orderModel.belongsTo(userModel, { foreignKey: "user_id" });
userModel.hasMany(orderModel, { foreignKey: "user_id" });
orderModel.belongsTo(addressModel, { foreignKey: "address_id" });
addressModel.hasMany(orderModel, { foreignKey: "address_id" });
orderModel.belongsToMany(foodModel, { through: "Order_Food_Relation" });
foodModel.belongsToMany(orderModel, { through: "Order_Food_Relation" });

module.exports = {
  userModel,
  restaurantCatModel,
  restaurantModel,
  foodModel,
  addressModel,
  cityModel,
  favModel,
  orderModel,
  sequelize,
  Sequelize,
};
