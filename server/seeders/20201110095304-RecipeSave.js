const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.RecipeSave.bulkCreate([{ id: 1, userId: 1, recipeId: 1 }], {
      fields: ['id', 'userId', 'recipeId']
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RecipeSaves', null, {})
  }
}
