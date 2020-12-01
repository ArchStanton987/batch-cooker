const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Menu.bulkCreate([{ id: 1, UserId: 1, recipeId: 1 }], {
      fields: ['id', 'UserId', 'recipeId']
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Menus', null, {})
  }
}
