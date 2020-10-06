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
      { name: 'champignons de Paris', category: 'autres' },
      { name: 'tournedos', category: 'viandes et poissons' },
      { name: 'gibolin', category: 'autres' },
      { name: 'saindoux', category: 'autres' },
      { name: 'persil', category: 'assaisonnements et condiments' },
      { name: 'salade laitue', category: 'fruits et légumes' },
      { name: "huilde d'olive", category: 'assaisonnements et condiments' },
      { name: 'pommes de terre', category: 'céréales et féculents' },
      { name: 'reblochon', category: 'produits laitiers' },
      { name: 'oignons', category: 'fruits et légumes' },
      { name: 'échalote', category: 'assaisonnements et condiments' },
      { name: 'pâte à tartiner', category: 'sucrés' },
      { name: "sirop d'érable", category: 'sucrés' },
      { name: 'hareng', category: 'viandes et poissons' },
      { name: 'pommes', category: 'fruits et légumes' },
      { name: 'veau', category: 'viandes et poissons' },
      { name: 'carottes', category: 'fruits et légumes' },
      { name: 'boudin noir', category: 'viandes et poissons' },
      { name: 'huile de tournesol', category: 'assaisonnements et condiments' },
      { name: 'sirop de fraise', category: 'sucrés' },
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
