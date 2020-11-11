module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ShoppingLists',
      [
        { userId: 1, ingredientId: 1, quantity: 5, unity: 'g' },
        { userId: 1, ingredientId: 2, quantity: 1, unity: 'g' },
        { userId: 1, ingredientId: 3, quantity: 3, unity: 'p/' },
        { userId: 2, ingredientId: 2, quantity: 5, unity: 'g' },
        { userId: 2, ingredientId: 4, quantity: 180, unity: 'g' },
        { userId: 3, ingredientId: 3, quantity: 2, unity: 'p/' }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ShoppingLists', null, {})
  }
}
