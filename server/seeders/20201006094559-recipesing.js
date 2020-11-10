'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RecipeIngs', [
      { recipeId: 1, ingredientId: 13, quantity: 2, unity: null },
      { recipeId: 1, ingredientId: 14, quantity: 10, unity: 'cl' },
      { recipeId: 1, ingredientId: 15, quantity: 10, unity: 'g' },
      { recipeId: 1, ingredientId: 16, quantity: 4, unity: 'g' },
      { recipeId: 2, ingredientId: 17, quantity: 2, unity: null },
      { recipeId: 2, ingredientId: 8, quantity: 200, unity: 'g' },
      { recipeId: 2, ingredientId: 18, quantity: 5, unity: 'cl' },
      { recipeId: 3, ingredientId: 3, quantity: 1, unity: null },
      { recipeId: 4, ingredientId: 19, quantity: 800, unity: 'g' },
      { recipeId: 4, ingredientId: 20, quantity: 800, unity: 'g' },
      { recipeId: 4, ingredientId: 21, quantity: 500, unity: 'g' },
      { recipeId: 4, ingredientId: 22, quantity: 5, unity: 'g' },
      { recipeId: 4, ingredientId: 23, quantity: 100, unity: 'g' },
      { recipeId: 4, ingredientId: 24, quantity: 20, unity: 'cl' },
      { recipeId: 5, ingredientId: 25, quantity: 200, unity: 'g' },
      { recipeId: 5, ingredientId: 26, quantity: 2, unity: null },
      { recipeId: 5, ingredientId: 18, quantity: 15, unity: 'g' },
      { recipeId: 6, ingredientId: 27, quantity: 200, unity: 'g' },
      { recipeId: 6, ingredientId: 5, quantity: 20, unity: 'cl' },
      { recipeId: 6, ingredientId: 28, quantity: 100, unity: 'g' },
      { recipeId: 7, ingredientId: 29, quantity: 200, unity: 'g' },
      { recipeId: 7, ingredientId: 30, quantity: 15, unity: 'cl' },
      { recipeId: 7, ingredientId: 31, quantity: 5, unity: 'cl' },
      { recipeId: 7, ingredientId: 14, quantity: 2, unity: 'cl' }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RecipeIngs', null, {});
  }
}
