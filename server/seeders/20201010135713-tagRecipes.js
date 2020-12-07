const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.TagRecipe.bulkCreate(
      [
        { id: 1, TagId: 1, RecipeId: 1 },
        { id: 2, TagId: 2, RecipeId: 1 },
        { id: 3, TagId: 3, RecipeId: 1 },
        { id: 4, TagId: 4, RecipeId: 2 },
        { id: 5, TagId: 5, RecipeId: 2 },
        { id: 6, TagId: 6, RecipeId: 4 },
        { id: 7, TagId: 7, RecipeId: 4 },
        { id: 8, TagId: 7, RecipeId: 5 },
        { id: 9, TagId: 8, RecipeId: 6 },
        { id: 10, TagId: 9, RecipeId: 6 },
        { id: 11, TagId: 5, RecipeId: 7 },
        { id: 12, TagId: 10, RecipeId: 7 }
      ],
      { fields: ['id', 'TagId', 'RecipeId'] }
    )
    // const existingRows = await models.TagRecipe.count();
    // await queryInterface.sequelize.query(`ALTER SEQUENCE "TagRecipes_id_seq" RESTART WITH ${existingRows + 1}`)
  },

  down: async (queryInterface, Sequelize) => {}
}
