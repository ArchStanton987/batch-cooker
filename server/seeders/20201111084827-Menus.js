const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Menu.bulkCreate([{ userId: 1, recipeId: 1 }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Menus', null, {})
  }
}
