const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.RecipeSave.bulkCreate([{ id: 1, UserId: 1, RecipeId: 1 }], {
      fields: ['id', 'UserId', 'RecipeId']
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RecipeSaves', null, {})
  }
}
