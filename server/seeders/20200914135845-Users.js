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
        },
        {
          id: 2,
          email: 'azeblouse@msn.com',
          username: 'azeblouse',
          password: 'pouetpouet',
          isAdmin: false
        },
        {
          id: 3,
          email: 'ericantonnais@msn.com',
          username: 'ericantonnais',
          password: 'pouetpouet',
          isAdmin: false
        }
      ],
      {
        validate: true,
        individualHooks: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users')
  }
}
