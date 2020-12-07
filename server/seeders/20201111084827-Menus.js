const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Menu.bulkCreate([{ id: 1, UserId: 1, RecipeId: 1 }], {
      fields: ['id', 'UserId', 'RecipeId']
    })
    // const existingRows = await models.Menu.count();
    // await queryInterface.sequelize.query(`ALTER SEQUENCE "Menus_id_seq" RESTART WITH ${existingRows + 1}`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Menus', null, {})
  }
}
