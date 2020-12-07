const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.ShoppingList.bulkCreate(
      [{ id: 1, UserId: 1, IngredientId: 1, quantity: 5, unit: 'g' }],
      {
        fields: ['id', 'UserId', 'IngredientId', 'quantity', 'unit']
      }
    )
    const existingRows = await models.ShoppingList.count();
    await queryInterface.sequelize.query(`ALTER SEQUENCE "ShoppingLists_id_seq" RESTART WITH ${existingRows + 1}`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ShoppingLists', null, {})
  }
}
