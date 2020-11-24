const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Inventories',
      [
        { userId: 1, ingredientId: 1, quantity: 5, unit: 'g' },
        { userId: 1, ingredientId: 2, quantity: 1, unit: 'g' },
        { userId: 1, ingredientId: 3, quantity: 3, unit: 'p/' },
        { userId: 2, ingredientId: 2, quantity: 5, unit: 'g' },
        { userId: 2, ingredientId: 4, quantity: 180, unit: 'g' },
        { userId: 3, ingredientId: 3, quantity: 2, unit: 'p/' }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Inventories', null, {})
  }
}
