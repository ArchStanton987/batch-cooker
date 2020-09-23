const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Inventories',
      [
        { userId: 1, ingredientId: 1, quantity: 1 },
        { userId: 1, ingredientId: 2, quantity: 1 },
        { userId: 1, ingredientId: 3, quantity: 1 },
        { userId: 2, ingredientId: 2, quantity: 1 },
        { userId: 2, ingredientId: 4, quantity: 1 },
        { userId: 3, ingredientId: 3, quantity: 1 }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Inventories', null, {})
  }
}
