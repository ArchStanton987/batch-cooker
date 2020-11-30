const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.ShoppingList.bulkCreate([{ userId: 1, ingredientId: 1, quantity: 5, unit: 'g' }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ShoppingLists', null, {})
  }
}
