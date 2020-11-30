const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.TagRecipe.bulkCreate(
      [
        { id: 1, tagId: 1, recipeId: 1 },
        { id: 2, tagId: 2, recipeId: 1 },
        { id: 3, tagId: 3, recipeId: 1 },
        { id: 4, tagId: 4, recipeId: 2 },
        { id: 5, tagId: 5, recipeId: 2 },
        { id: 6, tagId: 6, recipeId: 4 },
        { id: 7, tagId: 7, recipeId: 4 },
        { id: 8, tagId: 7, recipeId: 5 },
        { id: 9, tagId: 8, recipeId: 6 },
        { id: 10, tagId: 9, recipeId: 6 },
        { id: 11, tagId: 5, recipeId: 7 },
        { id: 12, tagId: 10, recipeId: 7 }
      ],
      { fields: ['id', 'tagId', 'recipeId'] }
    )
  },

  down: async (queryInterface, Sequelize) => {}
}
