const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.RecipeIng.bulkCreate(
      [
        { id: 1, recipeId: 1, ingredientId: 1, quantity: 1, unit: null },
        { id: 2, recipeId: 1, ingredientId: 2, quantity: 1, unit: 'kg' },
        { id: 3, recipeId: 1, ingredientId: 3, quantity: 700, unit: 'g' },
        { id: 4, recipeId: 1, ingredientId: 4, quantity: 3, unit: null },
        { id: 5, recipeId: 1, ingredientId: 5, quantity: 3, unit: null },
        { id: 6, recipeId: 1, ingredientId: 6, quantity: 20, unit: 'cl' },
        { id: 7, recipeId: 1, ingredientId: 7, quantity: 1, unit: null },
        { id: 8, recipeId: 1, ingredientId: 8, quantity: 8, unit: 'cl' },
        { id: 9, recipeId: 1, ingredientId: 9, quantity: 1, unit: null },
        { id: 10, recipeId: 1, ingredientId: 10, quantity: 1, unit: null },
        { id: 11, recipeId: 2, ingredientId: 11, quantity: 500, unit: 'g' },
        { id: 12, recipeId: 2, ingredientId: 12, quantity: 2, unit: null },
        { id: 13, recipeId: 2, ingredientId: 13, quantity: 25, unit: 'g' },
        { id: 14, recipeId: 2, ingredientId: 14, quantity: 3, unit: null },
        { id: 15, recipeId: 2, ingredientId: 15, quantity: 60, unit: 'g' },
        { id: 16, recipeId: 2, ingredientId: 16, quantity: 50, unit: 'g' },
        { id: 17, recipeId: 2, ingredientId: 8, quantity: 5, unit: 'cl' },
        { id: 18, recipeId: 2, ingredientId: 17, quantity: 1, unit: 'g' },
        { id: 19, recipeId: 2, ingredientId: 9, quantity: 1, unit: null },
        { id: 20, recipeId: 2, ingredientId: 10, quantity: 1, unit: null },
        { id: 21, recipeId: 3, ingredientId: 18, quantity: 2, unit: null },
        { id: 22, recipeId: 3, ingredientId: 19, quantity: 5, unit: 'cl' },
        { id: 23, recipeId: 3, ingredientId: 20, quantity: 5, unit: 'cl' },
        { id: 24, recipeId: 3, ingredientId: 9, quantity: 1, unit: null },
        { id: 25, recipeId: 4, ingredientId: 21, quantity: 500, unit: 'g' },
        { id: 26, recipeId: 4, ingredientId: 13, quantity: 50, unit: 'cl' },
        { id: 27, recipeId: 4, ingredientId: 22, quantity: 3, unit: null },
        { id: 28, recipeId: 4, ingredientId: 9, quantity: 1, unit: null },
        { id: 29, recipeId: 4, ingredientId: 10, quantity: 1, unit: null },
        { id: 30, recipeId: 4, ingredientId: 23, quantity: 250, unit: 'g' },
        { id: 31, recipeId: 4, ingredientId: 4, quantity: 1, unit: null },
        { id: 32, recipeId: 5, ingredientId: 24, quantity: 2, unit: null },
        { id: 33, recipeId: 5, ingredientId: 25, quantity: 4, unit: null },
        { id: 34, recipeId: 5, ingredientId: 14, quantity: 1, unit: null },
        { id: 35, recipeId: 5, ingredientId: 4, quantity: 2, unit: null },
        { id: 36, recipeId: 5, ingredientId: 8, quantity: 5, unit: 'cl' },
        { id: 37, recipeId: 5, ingredientId: 26, quantity: 2, unit: 'cl' },
        { id: 38, recipeId: 5, ingredientId: 9, quantity: 1, unit: null },
        { id: 39, recipeId: 5, ingredientId: 10, quantity: 1, unit: null },
        { id: 40, recipeId: 6, ingredientId: 27, quantity: 1, unit: null },
        { id: 41, recipeId: 6, ingredientId: 28, quantity: 6, unit: null },
        { id: 42, recipeId: 6, ingredientId: 29, quantity: 1, unit: 'sachet' },
        { id: 43, recipeId: 6, ingredientId: 30, quantity: 30, unit: 'g' },
        { id: 44, recipeId: 7, ingredientId: 31, quantity: 1, unit: null },
        { id: 45, recipeId: 7, ingredientId: 32, quantity: 5, unit: 'cl' },
        { id: 46, recipeId: 7, ingredientId: 33, quantity: 1, unit: 'cl' },
        { id: 47, recipeId: 7, ingredientId: 34, quantity: 3, unit: 'tranches' }
      ],
      {
        fields: ['id', 'recipeId', 'ingredientId', 'quantity', 'unit']
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RecipeIngs', null, {})
  }
}
