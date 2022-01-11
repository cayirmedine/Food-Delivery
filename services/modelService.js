module.exports = {
  // Get all data
  findAll: async function (model, options) {
    return await model.findAll(options);
  },

  // Find a specific data
  findOne: async function (model, options) {
    return await model.findOne(options);
  },

  // Create a data
  create: async function (model, options, transaction) {
    return await model.create(options, transaction);
  },

  createWithInclude: async function (model, options, include, transaction) {
    return await model.create(options, include, transaction);
  },

  // Find or created a data
  findOrCreate: async function (model, options) {
    const [data, created] = await model.findOrCreate(options);
    return data;
  },

  // Update a data
  update: async function (model, updatedAttr, whereCondition, transaction) {
    return await model.update(updatedAttr, whereCondition, transaction);
  },

  // Delete a data
  delete: async function (model, options, transaction) {
    return await model.destroy(options, transaction);
  },
};
