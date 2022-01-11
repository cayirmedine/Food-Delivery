const bcrypt = require("bcryptjs");

module.exports = {
  hashPassword: async (password) => {
    const hashedPass = await bcrypt.hash(password, 10);
    return hashedPass;
  },

  checkPassword: async (checkPassword, correctPassword) => {
    return await bcrypt.compare(checkPassword, correctPassword);
  },
};
