var express = require("express");
var router = express.Router();
// var passport = require('passport');

// const isLoggedIn = (req, res, next) => {
//   req.user ? next() : res.sendStatus(401);
// };

const userController = require("../../controller/userController");
const validate = require("../../validators/auth");

router.post("/sign-up", validate.signUp, userController.signUp);

router.post("/sign-in", userController.signIn);

router.put("/update-profile/:userId", validate.updateUser, userController.updateProfile);

router.put("/change-password/:userId", validate.changePassword, userController.changePassword);

router.delete("/delete-profile/:userId", userController.deleteProfile);

module.exports = router;
