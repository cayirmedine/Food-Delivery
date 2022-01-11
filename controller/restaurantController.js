const {
  restaurantCatModel,
  restaurantModel,
  foodModel,
  restaurantCatRelationalModel,
  sequelize,
} = require("../database/db");
const modelService = require("../services/modelService");

module.exports = {
  findAllCategories: async (req, res, next) => {
    try {
      const categories = await modelService.findAll(restaurantCatModel);

      await res.json({ status: "success", data: categories });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findOneCategory: async (req, res, next) => {
    const { catId } = req.params;

    try {
      const category = await modelService.findOne(restaurantCatModel, {
        where: { id: catId },
      });

      await res.json({ status: "success", data: category });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  createCategory: async (req, res, next) => {
    const { title } = req.body;
    const { location, mimetype, size } = req.file;

    const t = await sequelize.transaction();
    try {
      const category = await modelService.findOrCreate(restaurantCatModel, {
        where: {
          title,
          photoLink: location,
          photoType: mimetype,
          photoSize: size,
        },
        defaults: {
          title,
          photoLink: location,
          photoType: mimetype,
          photoSize: size,
        },
        transaction: t,
      });

      await t.commit();

      res.json({ status: "success", data: category });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      await t.rollback();
      next(error);
    }
  },

  findAllRestaurants: async (req, res, next) => {
    try {
      const restaurants = await modelService.findAll(restaurantModel);

      await res.json({ status: "success", data: restaurants });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findOneRestaurant: async (req, res, next) => {
    const { restaurantId } = req.params;

    try {
      const restaurant = await modelService.findOne(restaurantModel, {
        where: { id: restaurantId },
      });

      await res.json({ status: "success", data: restaurant });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findCategoriesRestaurants: async (req, res, next) => {
    const { catId } = req.params;

    try {
      let options = {
        where: { CategoryId: catId },
        include: [
          {
            model: restaurantModel,
            as: "RestaurantCats",
            attributes: [
              "id",
              "title",
              "deliveryTime",
              "photoLink",
              "rating",
              "priceRating",
            ],
          },
        ],
      };

      const restaurants = await modelService.findAll(
        restaurantCatRelationalModel,
        options
      );

      await res.json({ status: "success", data: restaurants });
    } catch (error) {
      console.log("HATAA", error);
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  createRestaurant: async (req, res, next) => {
    const { title, deliveryTime, rating, priceRating, cat_ids } =
      await req.body;
    const { location, mimetype, size } = req.file;

    const t = await sequelize.transaction();
    try {
      const restaurant = await modelService.create(
        restaurantModel,
        {
          title,
          deliveryTime,
          rating,
          priceRating,
          photoLink: location,
          photoType: mimetype,
          photoSize: size,
        },
        { transaction: t }
      );

      for (const cat_id of cat_ids) {
        await modelService.create(
          restaurantCatRelationalModel,
          {
            cat_id,
            restaurant_id: Number(restaurant.dataValues.id),
          },
          { transaction: t }
        );
      }

      await t.commit();

      res.json({ status: "success", data: restaurant });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      await t.rollback();
      next(error);
    }
  },

  findAllFood: async (req, res, next) => {
    try {
      const foods = await modelService.findAll(foodModel);
      await res.json({ status: "success", data: foods });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findAllRestaurantFoods: async (req, res, next) => {
    const { restaurantId } = req.params;

    try {
      const foods = await modelService.findAll(foodModel, {
        where: { restaurant_id: restaurantId },
      });
      await res.json({ status: "success", data: foods });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findOneFood: async (req, res, next) => {
    const { foodId } = req.params;

    try {
      const food = await modelService.findOne(foodModel, {
        where: { id: foodId },
      });
      await res.json({ status: "success", data: food });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  createFood: async (req, res, next) => {
    const { title, unitPrice, calorie, description, restaurant_id } = req.body;
    const { location, mimetype, size } = req.file;

    const t = await sequelize.transaction();
    try {
      const food = await modelService.findOrCreate(foodModel, {
        where: {
          title,
          unitPrice,
          calorie,
          description,
          restaurant_id,
          photoLink: location,
          photoType: mimetype,
          photoSize: size,
        },
        defaults: {
          title,
          unitPrice,
          calorie,
          description,
          restaurant_id,
          photoLink: location,
          photoType: mimetype,
          photoSize: size,
        },
        transaction: t,
      });

      await t.commit();

      res.json({ status: "success", data: food });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      await t.rollback();
      next(error);
    }
  },
};
