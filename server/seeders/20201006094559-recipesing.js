module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RecipeIngs', [
      { recipeId: 1, ingredientId: 1, quantity: 1, unit: null },
      { recipeId: 1, ingredientId: 2, quantity: 1, unit: 'kg' },
      { recipeId: 1, ingredientId: 3, quantity: 700, unit: 'g' },
      { recipeId: 1, ingredientId: 4, quantity: 3, unit: null },
      { recipeId: 1, ingredientId: 5, quantity: 3, unit: null },
      { recipeId: 1, ingredientId: 6, quantity: 20, unit: 'cl' },
      { recipeId: 1, ingredientId: 7, quantity: 1, unit: null },
      { recipeId: 1, ingredientId: 8, quantity: 8, unit: 'cl' },
      { recipeId: 1, ingredientId: 9, quantity: 1, unit: null },
      { recipeId: 1, ingredientId: 10, quantity: 1, unit: null },

      { recipeId: 2, ingredientId: 11, quantity: 500, unit: 'g' },
      { recipeId: 2, ingredientId: 12, quantity: 2, unit: null },
      { recipeId: 2, ingredientId: 13, quantity: 25, unit: 'g' },
      { recipeId: 2, ingredientId: 14, quantity: 3, unit: null },
      { recipeId: 2, ingredientId: 15, quantity: 60, unit: 'g' },
      { recipeId: 2, ingredientId: 16, quantity: 50, unit: 'g' },
      { recipeId: 2, ingredientId: 8, quantity: 5, unit: 'cl' },
      { recipeId: 2, ingredientId: 17, quantity: 1, unit: 'g' },
      { recipeId: 2, ingredientId: 9, quantity: 1, unit: null },
      { recipeId: 2, ingredientId: 10, quantity: 1, unit: null },

      { recipeId: 3, ingredientId: 18, quantity: 2, unit: null },
      { recipeId: 3, ingredientId: 19, quantity: 5, unit: 'cl' },
      { recipeId: 3, ingredientId: 20, quantity: 5, unit: 'cl' },
      { recipeId: 3, ingredientId: 9, quantity: 1, unit: null },

      { recipeId: 4, ingredientId: 21, quantity: 500, unit: 'g' },
      { recipeId: 4, ingredientId: 13, quantity: 50, unit: 'cl' },
      { recipeId: 4, ingredientId: 22, quantity: 3, unit: null },
      { recipeId: 4, ingredientId: 9, quantity: 1, unit: null },
      { recipeId: 4, ingredientId: 10, quantity: 1, unit: null },
      { recipeId: 4, ingredientId: 23, quantity: 250, unit: 'g' },
      { recipeId: 4, ingredientId: 4, quantity: 1, unit: null },

      { recipeId: 5, ingredientId: 24, quantity: 2, unit: null },
      { recipeId: 5, ingredientId: 25, quantity: 4, unit: null },
      { recipeId: 5, ingredientId: 14, quantity: 1, unit: null },
      { recipeId: 5, ingredientId: 4, quantity: 2, unit: null },
      { recipeId: 5, ingredientId: 8, quantity: 5, unit: 'cl' },
      { recipeId: 5, ingredientId: 26, quantity: 2, unit: 'cl' },
      { recipeId: 5, ingredientId: 9, quantity: 1, unit: null },
      { recipeId: 5, ingredientId: 10, quantity: 1, unit: null },

      { recipeId: 6, ingredientId: 27, quantity: 1, unit: null },
      { recipeId: 6, ingredientId: 28, quantity: 6, unit: null },
      { recipeId: 6, ingredientId: 29, quantity: 1, unit: 'sachet' },
      { recipeId: 6, ingredientId: 30, quantity: 30, unit: 'g' },

      { recipeId: 7, ingredientId: 31, quantity: 1, unit: null },
      { recipeId: 7, ingredientId: 32, quantity: 5, unit: 'cl' },
      { recipeId: 7, ingredientId: 33, quantity: 1, unit: 'cl' },
      { recipeId: 7, ingredientId: 34, quantity: 3, unit: 'tranches' }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RecipeIngs', null, {})
  }
}
