const models = require('../models')

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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users')
  }
}
