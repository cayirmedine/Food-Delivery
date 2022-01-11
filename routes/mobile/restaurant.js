var express = require("express");
var router = express.Router();
// var passport = require('passport');

// const isLoggedIn = (req, res, next) => {
//   req.user ? next() : res.sendStatus(401);
// };

const restaurantController = require("../../controller/restaurantController");
const uploadImageS3 = require("../../services/imageUploadService");

router.get("/all-categories", restaurantController.findAllCategories);

router.get("/category/:catId", restaurantController.findOneCategory);

router.post(
  "/add-category",
  uploadImageS3.single("image"),
  restaurantController.createCategory
);

router.get("/all-restaurants", restaurantController.findAllRestaurants);

router.get("/restaurant/:restaurantId", restaurantController.findOneRestaurant);

router.get(
  "/category-restaurants/:catId",
  restaurantController.findCategoriesRestaurants
);

router.post(
  "/add-restaurant",
  uploadImageS3.single("image"),
  restaurantController.createRestaurant
);

router.get("/all-foods", restaurantController.findAllFood);

router.get("/restaurant-foods/:restaurantId", restaurantController.findAllRestaurantFoods);

router.get("/food/:foodId", restaurantController.findOneFood);

router.post(
  "/add-food",
  uploadImageS3.single("image"),
  restaurantController.createFood
);

module.exports = router;
