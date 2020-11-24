'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RecipeIngs', [
      { recipeId: 1, ingredientId: 13, quantity: 2, unit: null },
      { recipeId: 1, ingredientId: 14, quantity: 10, unit: 'cl' },
      { recipeId: 1, ingredientId: 15, quantity: 10, unit: 'g' },
      { recipeId: 1, ingredientId: 16, quantity: 4, unit: 'g' },
      { recipeId: 2, ingredientId: 17, quantity: 2, unit: null },
      { recipeId: 2, ingredientId: 8, quantity: 200, unit: 'g' },
      { recipeId: 2, ingredientId: 18, quantity: 5, unit: 'cl' },
      { recipeId: 3, ingredientId: 3, quantity: 1, unit: null },
      { recipeId: 4, ingredientId: 19, quantity: 800, unit: 'g' },
      { recipeId: 4, ingredientId: 20, quantity: 800, unit: 'g' },
      { recipeId: 4, ingredientId: 21, quantity: 500, unit: 'g' },
      { recipeId: 4, ingredientId: 22, quantity: 5, unit: 'g' },
      { recipeId: 4, ingredientId: 23, quantity: 100, unit: 'g' },
      { recipeId: 4, ingredientId: 24, quantity: 20, unit: 'cl' },
      { recipeId: 5, ingredientId: 25, quantity: 200, unit: 'g' },
      { recipeId: 5, ingredientId: 26, quantity: 2, unit: null },
      { recipeId: 5, ingredientId: 18, quantity: 15, unit: 'g' },
      { recipeId: 6, ingredientId: 27, quantity: 200, unit: 'g' },
      { recipeId: 6, ingredientId: 5, quantity: 20, unit: 'cl' },
      { recipeId: 6, ingredientId: 28, quantity: 100, unit: 'g' },
      { recipeId: 7, ingredientId: 29, quantity: 200, unit: 'g' },
      { recipeId: 7, ingredientId: 30, quantity: 15, unit: 'cl' },
      { recipeId: 7, ingredientId: 31, quantity: 5, unit: 'cl' },
      { recipeId: 7, ingredientId: 14, quantity: 2, unit: 'cl' }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RecipeIngs', null, {});
  }
}
