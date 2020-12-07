const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.RecipeIng.bulkCreate(
      [
        { id: 1, RecipeId: 1, IngredientId: 1, quantity: 1, unit: null },
        { id: 2, RecipeId: 1, IngredientId: 2, quantity: 1, unit: 'kg' },
        { id: 3, RecipeId: 1, IngredientId: 3, quantity: 700, unit: 'g' },
        { id: 4, RecipeId: 1, IngredientId: 4, quantity: 3, unit: null },
        { id: 5, RecipeId: 1, IngredientId: 5, quantity: 3, unit: null },
        { id: 6, RecipeId: 1, IngredientId: 6, quantity: 20, unit: 'cl' },
        { id: 7, RecipeId: 1, IngredientId: 7, quantity: 1, unit: null },
        { id: 8, RecipeId: 1, IngredientId: 8, quantity: 8, unit: 'cl' },
        { id: 9, RecipeId: 1, IngredientId: 9, quantity: 1, unit: null },
        { id: 10, RecipeId: 1, IngredientId: 10, quantity: 1, unit: null },
        { id: 11, RecipeId: 2, IngredientId: 11, quantity: 500, unit: 'g' },
        { id: 12, RecipeId: 2, IngredientId: 12, quantity: 2, unit: null },
        { id: 13, RecipeId: 2, IngredientId: 13, quantity: 25, unit: 'g' },
        { id: 14, RecipeId: 2, IngredientId: 14, quantity: 3, unit: null },
        { id: 15, RecipeId: 2, IngredientId: 15, quantity: 60, unit: 'g' },
        { id: 16, RecipeId: 2, IngredientId: 16, quantity: 50, unit: 'g' },
        { id: 17, RecipeId: 2, IngredientId: 8, quantity: 5, unit: 'cl' },
        { id: 18, RecipeId: 2, IngredientId: 17, quantity: 1, unit: 'g' },
        { id: 19, RecipeId: 2, IngredientId: 9, quantity: 1, unit: null },
        { id: 20, RecipeId: 2, IngredientId: 10, quantity: 1, unit: null },
        { id: 21, RecipeId: 3, IngredientId: 18, quantity: 2, unit: null },
        { id: 22, RecipeId: 3, IngredientId: 19, quantity: 5, unit: 'cl' },
        { id: 23, RecipeId: 3, IngredientId: 20, quantity: 5, unit: 'cl' },
        { id: 24, RecipeId: 3, IngredientId: 9, quantity: 1, unit: null },
        { id: 25, RecipeId: 4, IngredientId: 21, quantity: 500, unit: 'g' },
        { id: 26, RecipeId: 4, IngredientId: 13, quantity: 50, unit: 'cl' },
        { id: 27, RecipeId: 4, IngredientId: 22, quantity: 3, unit: null },
        { id: 28, RecipeId: 4, IngredientId: 9, quantity: 1, unit: null },
        { id: 29, RecipeId: 4, IngredientId: 10, quantity: 1, unit: null },
        { id: 30, RecipeId: 4, IngredientId: 23, quantity: 250, unit: 'g' },
        { id: 31, RecipeId: 4, IngredientId: 4, quantity: 1, unit: null },
        { id: 32, RecipeId: 5, IngredientId: 24, quantity: 2, unit: null },
        { id: 33, RecipeId: 5, IngredientId: 25, quantity: 4, unit: null },
        { id: 34, RecipeId: 5, IngredientId: 14, quantity: 1, unit: null },
        { id: 35, RecipeId: 5, IngredientId: 4, quantity: 2, unit: null },
        { id: 36, RecipeId: 5, IngredientId: 8, quantity: 5, unit: 'cl' },
        { id: 37, RecipeId: 5, IngredientId: 26, quantity: 2, unit: 'cl' },
        { id: 38, RecipeId: 5, IngredientId: 9, quantity: 1, unit: null },
        { id: 39, RecipeId: 5, IngredientId: 10, quantity: 1, unit: null },
        { id: 40, RecipeId: 6, IngredientId: 27, quantity: 1, unit: null },
        { id: 41, RecipeId: 6, IngredientId: 28, quantity: 6, unit: null },
        { id: 42, RecipeId: 6, IngredientId: 29, quantity: 1, unit: 'sachet' },
        { id: 43, RecipeId: 6, IngredientId: 30, quantity: 30, unit: 'g' },
        { id: 44, RecipeId: 7, IngredientId: 31, quantity: 1, unit: null },
        { id: 45, RecipeId: 7, IngredientId: 32, quantity: 5, unit: 'cl' },
        { id: 46, RecipeId: 7, IngredientId: 33, quantity: 1, unit: 'cl' },
        { id: 47, RecipeId: 7, IngredientId: 34, quantity: 3, unit: 'tranches' }
      ],
      {
        fields: ['id', 'RecipeId', 'IngredientId', 'quantity', 'unit']
      }
    )
    // const existingRows = await models.RecipeIng.count();
    // await queryInterface.sequelize.query(`ALTER SEQUENCE "RecipeIngs_id_seq" RESTART WITH ${existingRows + 1}`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RecipeIngs', null, {})
  }
}
