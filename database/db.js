var Sequelize = require("sequelize");

var dotenv = require("dotenv");
dotenv.config();

var sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

//Auth Models
const user = require("../models/auth/user");

//Restaurant Models
const restaurantCat = require("../models/restaurant/category");
const restaurant = require("../models/restaurant/restaurant");
const food = require("../models/restaurant/foods");
const comment = require("../models/restaurant/comments");

//Common Models
const address = require("../models/common/address");
const city = require("../models/common/city");
const fav = require("../models/common/favorites");
const location = require("../models/common/location");

//Cart Models
const order = require("../models/cart/order");

//Relational Models

const orderFood = require("../models/relations/orderFood");

const userModel = user(sequelize, Sequelize);
const restaurantCatModel = restaurantCat(sequelize, Sequelize);
const restaurantModel = restaurant(sequelize, Sequelize);
const foodModel = food(sequelize, Sequelize);
const addressModel = address(sequelize, Sequelize);
const cityModel = city(sequelize, Sequelize);
const favModel = fav(sequelize, Sequelize);
const orderModel = order(sequelize, Sequelize);
const orderFoodModel = orderFood(sequelize, Sequelize);
const commentModel = comment(sequelize, Sequelize);
const locationModel = location(sequelize, Sequelize);

addressModel.belongsTo(userModel, { foreignKey: "user_id" });
userModel.hasMany(addressModel, { foreignKey: "user_id" });
addressModel.belongsTo(restaurantModel, { foreignKey: "restaurant_id" });
restaurantModel.hasOne(addressModel, { foreignKey: "restaurant_id" });
addressModel.belongsTo(cityModel, { foreignKey: "city_id" });
cityModel.hasMany(addressModel, { foreignKey: "city_id" });
restaurantModel.belongsTo(restaurantCatModel, { foreignKey: "cat_id" });
restaurantCatModel.hasMany(restaurantModel, { foreignKey: "cat_id" });
foodModel.belongsTo(restaurantModel, { foreignKey: "restaurant_id" });
restaurantModel.hasMany(foodModel, { foreignKey: "restaurant_id", as: "menu" });
favModel.belongsTo(userModel, { foreignKey: "user_id" });
userModel.hasMany(favModel, { foreignKey: "user_id" });
favModel.belongsTo(restaurantModel, { foreignKey: "restaurant_id" });
restaurantModel.hasMany(favModel, { foreignKey: "restaurant_id" });
orderModel.belongsTo(userModel, { foreignKey: "user_id" });
userModel.hasMany(orderModel, { foreignKey: "user_id" });
orderModel.belongsTo(addressModel, { foreignKey: "address_id" });
addressModel.hasMany(orderModel, { foreignKey: "address_id" });
orderModel.belongsToMany(foodModel, {
  as: "FoodOrders",
  through: orderFoodModel,
  foreignKey: "food_id",
});
foodModel.belongsToMany(orderModel, {
  as: "OrderFoods",
  through: orderFoodModel,
  foreignKey: "order_id",
});
commentModel.belongsTo(userModel, { foreignKey: "user_id" });
userModel.hasMany(commentModel, { foreignKey: "user_id" });

commentModel.belongsTo(foodModel, { foreignKey: "food_id" });
foodModel.hasMany(commentModel, { foreignKey: "food_id" });

commentModel.belongsTo(restaurantModel, { foreignKey: "restaurant_id" });
restaurantModel.hasMany(commentModel, { foreignKey: "restaurant_id" });

locationModel.belongsTo(restaurantModel, { foreignKey: "restaurant_id" });
restaurantModel.hasOne(locationModel, {
  foreignKey: "restaurant_id",
  as: "location",
});

module.exports = {
  userModel,
  restaurantCatModel,
  restaurantModel,
  foodModel,
  addressModel,
  cityModel,
  favModel,
  orderModel,
  orderFoodModel,
  commentModel,
  locationModel,
  sequelize,
  Sequelize,
};
