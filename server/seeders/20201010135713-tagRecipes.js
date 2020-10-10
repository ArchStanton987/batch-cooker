'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('TagRecipes',
   [
     { tagId: 1, recipeId: 1 },
     { tagId: 10, recipeId: 1 },
     { tagId: 13, recipeId: 1 },
     { tagId: 2, recipeId: 2 },
     { tagId: 3, recipeId: 2 },
     { tagId: 12, recipeId: 2 },
     { tagId: 15, recipeId: 2 },
     { tagId: 10, recipeId: 3 },
     { tagId: 13, recipeId: 3 },
     { tagId: 9, recipeId: 3 },
     { tagId: 2, recipeId: 4 },
     { tagId: 6, recipeId: 4 },
     { tagId: 9, recipeId: 4 },
     { tagId: 4, recipeId: 5 },
     { tagId: 10, recipeId: 5 },
     { tagId: 15, recipeId: 5 },
     { tagId: 17, recipeId: 6 },
     { tagId: 13, recipeId: 6 },
     { tagId: 10, recipeId: 6 },
     { tagId: 1, recipeId: 7 },
     { tagId: 2, recipeId: 7 },
     { tagId: 3, recipeId: 7 }
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
