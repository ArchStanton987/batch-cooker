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
    await models.Ingredient.bulkCreate([
      { name: 'poivre', category: 'assaisonnements et condiments' },
      { name: 'sel', category: 'assaisonnements et condiments' },
      { name: 'magret de canard', category: 'viandes et poissons' },
      { name: 'truite fumée', category: 'viandes et poissons' },
      { name: 'crème fraiche', category: 'produits laitiers' },
      { name: 'beurre salé', category: 'produits laitiers' },
      { name: 'mangue', category: 'fruits et légumes' },
      { name: 'quinoa', category: 'céréales et féculents' },
      { name: 'miel', category: 'sucrés' },
      { name: 'ketchup', category: 'assaisonnements et condiments' },
      { name: 'rhum', category: 'autres' },
      { name: 'champignons de Paris', category: 'autres' }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Ingredients')
  }
}
