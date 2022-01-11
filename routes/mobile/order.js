var express = require("express");
var router = express.Router();

const orderController = require("../../controller/orderController");

router.get("/users-orders/:userId", orderController.findUsersOrders);

router.get("/order/:orderId", orderController.findOneOrder);

router.post("/make-order", orderController.makeOrder);