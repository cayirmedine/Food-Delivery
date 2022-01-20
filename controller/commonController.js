const modelService = require("../services/modelService");

const { favModel, addressModel, restaurantModel } = require("../database/db");

module.exports = {
  addFav: async (req, res, next) => {
    try {
      const fav = await modelService.create(favModel, req.body);

      res.json({ status: "success", data: fav });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findUsersFav: async (req, res, next) => {
    try {
      const { userId } = req.params;

      let options = {
        where: { user_id: userId },
        include: [
          { model: restaurantModel, attributes: ["id", "title", "photoLink"] },
        ],
      };

      const userFavs = await modelService.findAll(favModel, options);

      res.json({ status: "success", data: userFavs });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  deleteUsersFav: async (req, res, next) => {
    try {
      const { favId } = req.params;

      const deletedUserFav = await modelService.delete(favModel, {
        where: { id: favId },
      });

      res.json({ status: "success", data: deletedUserFav });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findAllAdresses: async (req, res, next) => {
    try {
      const addresses = await modelService.findAll(addressModel);

      res.json({ status: "success", data: addresses });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findUsersAddresses: async (req, res, next) => {
    try {
      const { userId } = req.params;

      let option = {
        where: {
          user_id: userId,
        },
      };

      const userAddresses = await modelService.findAll(addressModel, option);

      res.json({ status: "success", data: userAddresses });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findRestaurantsAddress: async (req, res, next) => {
    try {
      const { restaurantId } = req.params;

      let option = {
        where: {
          restaurant_id: restaurantId,
        },
      };

      const restaurantAddress = await modelService.findAll(
        addressModel,
        option
      );

      res.json({ status: "success", data: restaurantAddress });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  findOneAddress: async (req, res, next) => {
    try {
      const { addressId } = req.params;

      const address = await modelService.findOne(addressModel, {
        where: { id: addressId },
      });

      res.json({ status: "success", data: address });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  addAddress: async (req, res, next) => {
    try {
      // const {
      //   addressTitle,
      //   town,
      //   neigbourhood,
      //   addressDetail,
      //   user_id,
      //   restaurant_id,
      // } = req.body;

      //   let options = {
      //     addressTitle,
      //     town,
      //     neigbourhood,
      //     addressDetail,
      //     user_id,
      //     restaurant_id
      //   };

      const address = await modelService.create(addressModel, req.body);

      res.json({ status: "success", data: address });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  updateAddress: async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const updatedAddress = await modelService.update(addressModel, req.body, {
        where: { id: addressId },
      });

      res.json({ status: "success", data: updatedAddress });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  deleteAddress: async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const deletedAddress = await modelService.update(addressModel, {
        where: { id: addressId },
      });

      res.json({ status: "success", data: deletedAddress });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },
};
