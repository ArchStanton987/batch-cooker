'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RecipeSaves', [
      { userId: 1, recipeId: 1 },
      { userId: 1, recipeId: 2 },
      { userId: 1, recipeId: 3 },
      { userId: 1, recipeId: 4 },
      { userId: 1, recipeId: 6 },
      { userId: 1, recipeId: 7 },
      { userId: 2, recipeId: 1 },
      { userId: 2, recipeId: 2 },
      { userId: 2, recipeId: 4 },
      { userId: 3, recipeId: 5 },
      { userId: 3, recipeId: 6 }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RecipeSaves', null, {})
  }
}
