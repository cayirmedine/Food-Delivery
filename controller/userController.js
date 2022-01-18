let random = require("random-key");

const { userModel, sequelize } = require("../database/db");
const modelService = require("../services/modelService");
const passwordService = require("../services/passwordService");

module.exports = {
  //POST /api/v1/user/sign-up
  signUp: async (req, res, next) => {
    const { fullName, email, password, phone } = req.body;

    try {
      const hash = await passwordService.hashPassword(password);

      let options = {
        where: {
          phone: phone,
        },

        defaults: {
          fullName,
          email,
          password: hash,
          phone,
          access_token: random.generate(250),
        },
      };

      const user = await modelService.findOrCreate(userModel, options);

      if (user) {
        res.json({ status: "success", data: user });
      } else {
        res
          .status(422)
          .json({ status: "error", data: "User is already exists" });
      }

    } catch (error) {
      res.status(500).json({ status: "error", data: "Missing parameter(s)" });
      next(error);
    }
  },

  //POST /api/v1/user/sign-in
  signIn: async (req, res, next) => {
    const { phone, password } = req.body;

    let options = {
      where: {
        phone: phone,
      },
    };

    try {
      const user = await modelService.findOne(userModel, options);

      if (user) {
        const validPassword = await passwordService.checkPassword(
          password,
          user.password
        );

        if (validPassword) {
          await res.json({ status: "success", data: user });
        } else {
          res.status(422).json({
            status: "error",
            data: "Password is not correct",
          });
        }
      } else {
        res.status(422).json({
          status: "error",
          data: "Phone number is not correct",
        });
      }
    } catch (error) {
      res.status(500).json({ status: "error", data: "Missing parameter(s)" });
      next(error);
    }
  },

  //UPDATE /api/v1/user/update-profile/:userId
  updateProfile: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { fullName, email, phone, password } =
        req.body;

      let attrs = {
        fullName,
        email,
        phone,
      };

      let condition = {
        where: {
          id: userId,
        },
      };

      const user = await modelService.findOne(userModel, condition);

      const validPassword = await passwordService.checkPassword(
        password,
        user.password
      );

      if (validPassword) {
        var updatedProfile = await modelService.update(
          userModel,
          attrs,
          condition
        );
      } else {
        res.status(422).json({
          status: "error",
          data: "Password is not correct",
        });
      }

      res.json({ status: "success", data: updatedProfile });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { currentPassword, newPassword } = req.body;

      let options = {
        where: {
          id: userId,
        },
      };

      const user = await modelService.findOne(userModel, options);

      const validPassword = await passwordService.checkPassword(
        currentPassword,
        user.password
      );

      if (validPassword) {
        const newPass = await passwordService.hashPassword(newPassword);

        let attr = {
          password: newPass,
        };

        try {
          await modelService.update(userModel, attr, options);

          res.json({ status: "success", data: "Password changed" });
        } catch (error) {
          res.status(500).json({ status: "error", data: error });
          next(error);
        }
      } else {
        res.status(422).json({
          status: "error",
          data: "Password is not correct",
        });
      }
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },

  deleteProfile: async (req, res, next) => {
    const { userId } = req.params;
    const { password } = req.body;

    try {
      const user = await modelService.findOne(userModel, {
        where: { id: userId },
      });

      const validPassword = await passwordService.checkPassword(
        password,
        user.password
      );

      if (validPassword) {
        const deletedUser = await modelService.delete(userModel, {
          where: { id: userId },
        });

        res.json({ status: "success", data: deletedUser });
      } else {
        res.status(422).json({
          status: "error",
          data: "Password is not correct",
        });
      }
    } catch (error) {
      console.log("HATA", error);
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },
};
