const { orderModel, orderFoodModel, foodModel } = require("../database/db");
const modelService = require("../services/modelService");

module.exports = {
  findUsersOrders: async (req, res, next) => {
    try {
      const { userId } = req.params;

      let options = {
        where: { user_id: userId },
        include: [
          {
            model: foodModel,
            as: "FoodOrders",
            attributes: ["id", "restaurant_id", "updatedAt"],
          },
        ],
      };

      const orders = await modelService.findAll(orderModel, options);

      res.json({ status: "success", data: orders });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findOneOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const order = await modelService.findOne(orderModel, {
        where: { id: orderId },
      });

      res.json({ status: "success", data: order });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  makeOrder: async (req, res, next) => {
    try {
      const { paymentMethod, basketCost, user_id, address_id, food_ids } =
        req.body;

      let attrs = {
        paymentMethod,
        basketCost,
        user_id,
        address_id,
      };

      const t = await sequelize.transaction();

      const order = await modelService.create(orderModel, attrs, {
        transaction: t,
      });

      for (const food_id of food_ids) {
        await modelService.create(
          orderFoodModel,
          {
            order_id: Number(order.dataValues.id),
            food_id,
          },
          { transaction: t }
        );
      }

      await t.commit();

      res.json({ status: "success", data: order });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      await t.rollback();
      next(error);
    }
  },
};
