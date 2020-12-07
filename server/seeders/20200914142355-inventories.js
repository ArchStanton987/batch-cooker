const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Inventory.bulkCreate(
      [
        { id: 1, UserId: 1, IngredientId: 1, quantity: 15, unit: 'g' },
        { id: 2, UserId: 1, IngredientId: 2, quantity: 15, unit: 'g' },
        { id: 3, UserId: 1, IngredientId: 3, quantity: 3, unit: null }
      ],
      { fields: ['id', 'UserId', 'IngredientId', 'quantity', 'unit'] }
    )
    const existingRows = await models.Inventory.count();
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Inventories_id_seq" RESTART WITH ${existingRows + 1}`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Inventories', null, {})
  }
}
