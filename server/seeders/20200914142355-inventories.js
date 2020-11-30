module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Inventories',
      [
        { userId: 1, ingredientId: 1, quantity: 15, unit: 'g' },
        { userId: 1, ingredientId: 2, quantity: 15, unit: 'g' },
        { userId: 1, ingredientId: 3, quantity: 3, unit: '' }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Inventories', null, {})
  }
}
