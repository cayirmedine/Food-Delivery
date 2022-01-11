var express = require("express");
var router = express.Router();

const commonController = require("../../controller/commonController");

router.post("/add-fav", commonController.addFav);

router.get("/users-favs/:userId", commonController.findUsersFav);

router.delete("/delete-fav/:favId", commonController.deleteUsersFav);

router.get("/all-addresses", commonController.findAllAdresses);

router.get("/users-addresses/:userId", commonController.findAllAdresses);

router.get(
  "/restaurants-address/:restaurantId",
  commonController.findRestaurantsAddress
);

router.get("/address/:addressId", commonController.findOneAddress);

router.post("/add-address", commonController.addAddress);

router.put("/update-address/:addressId", commonController.updateAddress);

router.delete("/delete-address/:addressId", commonController.deleteAddress);

module.exports = router;