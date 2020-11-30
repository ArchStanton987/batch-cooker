const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Inventory.bulkCreate(
      [
        { id: 1, userId: 1, ingredientId: 1, quantity: 15, unit: 'g' },
        { id: 2, userId: 1, ingredientId: 2, quantity: 15, unit: 'g' },
        { id: 3, userId: 1, ingredientId: 3, quantity: 3, unit: null }
      ],
      { fields: ['id', 'userId', 'ingredientId', 'quantity', 'unit'] }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Inventories', null, {})
  }
}
