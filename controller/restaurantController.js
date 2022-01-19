const {
  restaurantCatModel,
  restaurantModel,
  foodModel,
  commentModel,
  sequelize,
  Sequelize,
} = require("../database/db");
const modelService = require("../services/modelService");

const { PythonShell } = require("python-shell");

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
      let options = {
        include: [
          {
            model: foodModel,
            as: "menu",
            attributes: [
              "id",
              "title",
              "photoLink",
              "description",
              "calories",
              "unitPrice",
              "rating",
            ],
          },
        ],
      };
      const restaurant = await modelService.findAll(restaurantModel, options);

      let result = {
          restaurant
    };

      await res.json({ status: "success", data: result });
    } catch (error) {
      console.log("HATAA", error);
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
        where: { cat_id: catId },
        include: [
          {
            model: foodModel,
            as: "menu",
            attributes: [
              "id",
              "title",
              "photoLink",
              "description",
              "calories",
              "unitPrice",
              "rating",
            ],
          },
        ],
      };

      const restaurants = await modelService.findAll(
        restaurantModel,
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
    const { title, deliveryTime, rating, priceRating, cat_id } =
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
          cat_id
        },
      );

      res.json({ status: "success", data: restaurant });
    } catch (error) {
      await console.log("HATAA", error);
      res.status(500).json({ status: "error", data: error });
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
    const { title, unitPrice, calories, description, rating, restaurant_id } =
      req.body;
    const { location, mimetype, size } = req.file;

    const t = await sequelize.transaction();

    try {
      const food = await modelService.findOrCreate(foodModel, {
        where: {
          title,
          unitPrice,
          calories,
          description,
          rating,
          restaurant_id,
          photoLink: location,
          photoType: mimetype,
          photoSize: size,
        },
        defaults: {
          title,
          unitPrice,
          calories,
          description,
          rating,
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

  findAllRestaurantComments: async (req, res, next) => {
    const { restaurantId } = req.params;

    try {
      let options = {
        where: {
          restaurant_id: restaurantId,
        },
      };

      const comments = await modelService.findAll(commentModel, options);

      res.json({ status: "success", data: comments });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findAllFoodComments: async (req, res, next) => {
    const { foodId } = req.params;

    try {
      let options = {
        where: {
          food_id: foodId,
        },
      };

      const comments = await modelService.findAll(commentModel, options);

      res.json({ status: "success", data: comments });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  createComment: async (req, res, next) => {
    const { content, user_id, food_id, restaurant_id } = req.body;

    const t = await sequelize.transaction();

    const Op = Sequelize.Op;

    try {
      // let options = {
      //   args: [content],
      // };

      var rating;
      // await PythonShell.run(
      //   "/home/baku/Belgeler/Food Delivery/NLP/nlp.py",
      //   options,
      //   async function (err, results) {
      //     if (err) {
      //       console.log("ERROR FROM PY", err);
      //       throw err;
      //     } else {
      //       await console.log("RESULTT TYPE", typeof results[0]);
      //       await console.log("RESULTT", results[0]);
      //       ratingPY = await Number(results[0]);
      //     }
      //   }
      // );

      let pyshell = await new PythonShell(
        "/home/baku/Belgeler/Food Delivery/NLP/nlp.py"
      );

      // sends a message to the Python script via stdin
      await pyshell.send(content);

      await pyshell.on("message", function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log("MESAAGE!!", message[0]);
        console.log("MESAAGE TYPE!!", typeof message[0]);
        rating = Number(message[0]);
      });

      // end the input stream and allow the process to exit
      await pyshell.end(async function (err, code, signal) {
        if (err) throw err;
        console.log("Rating!!", rating);
        console.log("The exit code was: " + code);
        console.log("The exit signal was: " + signal);
        console.log("finished");

        let createOptions = {
          content,
          user_id,
          food_id,
          restaurant_id,
          rating,
        };

        const comment = await modelService.create(commentModel, createOptions, {
          transaction: t,
        });

        var commentCount;
        await commentModel
          .count({ where: { food_id: { [Op.eq]: food_id } } })
          .then((c) => {
            commentCount = c;
          });

        var food = await modelService.findOne(foodModel, {
          where: { id: food_id },
        });

        await console.log("Comment Count", commentCount);

        var foodRating = await food.dataValues.rating;

        var newFoodRating;

        if (commentCount != 0)
          newFoodRating =
            (await (foodRating * commentCount + ratingPY)) / (commentCount + 1);
        else newFoodRating = rating;

        await modelService.update(
          foodModel,
          { rating: newFoodRating },
          { where: { id: food_id } },
          { transaction: t }
        );

        var foodCount;
        await foodModel
          .count({ where: { restaurant_id: { [Op.eq]: restaurant_id } } })
          .then((c) => {
            foodCount = c;
          });

        var restaurant = await modelService.findOne(restaurantModel, {
          where: { id: restaurant_id },
        });

        newRestaurantRating =
          (await (restaurant.dataValues.rating * foodCount -
            foodRating +
            newFoodRating)) / foodCount;

        await modelService.update(
          restaurantModel,
          { rating: newRestaurantRating },
          { where: { id: restaurant_id } },
          { transaction: t }
        );

        await t.commit();

        res.json({ status: "success", data: comment });
      });
    } catch (error) {
      console.log("HATAAAA", error);
      res.status(500).json({ status: "error", data: error });
      await t.rollback();
      next(error);
    }
  },
};
