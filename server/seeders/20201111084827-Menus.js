'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Menus', [
      { userId: 1, recipeId: 2 },
      { userId: 1, recipeId: 3 },
      { userId: 1, recipeId: 4 },
      { userId: 2, recipeId: 1 },
      { userId: 2, recipeId: 4 },
      { userId: 2, recipeId: 5 }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Menus', null, {})
  }
}
