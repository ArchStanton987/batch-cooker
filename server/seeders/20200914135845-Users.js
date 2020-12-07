const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.User.bulkCreate(
      [
        {
          id: 1,
          email: 'yligotmi@msn.com',
          username: 'yligotmi',
          password: 'pouetpouet',
          isAdmin: false
        }
      ],
      {
        validate: true,
        individualHooks: true
      }
    )
    const existingRows = await models.User.count();
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Users_id_seq" RESTART WITH ${existingRows + 1}`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users')
  }
}
