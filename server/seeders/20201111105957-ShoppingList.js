const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.ShoppingList.bulkCreate(
      [{ id: 1, UserId: 1, IngredientId: 1, quantity: 5, unit: 'g' }],
      {
        fields: ['id', 'UserId', 'IngredientId', 'quantity', 'unit']
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ShoppingLists', null, {})
  }
}
