module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TagRecipes', [
      { tagId: 1, recipeId: 1 },
      { tagId: 2, recipeId: 1 },
      { tagId: 3, recipeId: 1 },

      { tagId: 4, recipeId: 2 },
      { tagId: 5, recipeId: 2 },

      { tagId: 6, recipeId: 4 },
      { tagId: 7, recipeId: 4 },

      { tagId: 7, recipeId: 5 },

      { tagId: 8, recipeId: 6 },
      { tagId: 9, recipeId: 6 },

      { tagId: 5, recipeId: 7 },
      { tagId: 10, recipeId: 7 }
    ])
  },

  down: async (queryInterface, Sequelize) => {}
}
