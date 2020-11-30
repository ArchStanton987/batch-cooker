const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Ingredient.bulkCreate([
      { name: 'poulet', category: 'viandes et poissons' },
      { name: 'tomate', category: 'fruits et légumes' },
      { name: 'poivron', category: 'fruits et légumes' },
      { name: 'oignon', category: 'fruits et légumes' },
      { name: 'ail', category: 'assaisonnements et condiments' },
      { name: 'vin blanc', category: 'autres' },
      { name: 'bouquet garni', category: 'assaisonnements et condiments' },
      { name: "huile d'olive", category: 'assaisonnements et condiments' },
      { name: 'sel', category: 'assaisonnements et condiments' },
      { name: 'poivre', category: 'assaisonnements et condiments' },

      { name: 'riz à risotto', category: 'céréales et féculents' },
      { name: 'bouillon de volaille', category: 'autres' },
      { name: 'crème fraiche', category: 'produits laitiers' },
      { name: 'échalote', category: 'assaisonnements et condiments' },
      { name: 'parmesan', category: 'produits laitiers' },
      { name: 'chorizo', category: 'viandes et poissons' },
      { name: 'paprika', category: 'assaisonnements et condiments' },

      { name: 'magret de canard', category: 'viandes et poissons' },
      { name: 'miel', category: 'sucrés' },
      { name: 'vinaigre balsamique', category: 'assaisonnements et condiments' },

      { name: 'pâtes', category: 'céréales et féculents' },
      { name: 'oeufs', category: 'viandes et poissons' },
      { name: 'lardons', category: 'viandes et poissons' },

      { name: 'filet de hareng', category: 'viandes et poissons' },
      { name: 'pomme de terre', category: 'céréales et féculents' },
      { name: 'vinaigre de vin', category: 'assaisonnements et condiments' },

      { name: 'pâte brisée', category: 'autres' },
      { name: 'pomme', category: 'fruits et légumes' },
      { name: 'sucre vanillé', category: 'sucrés' },
      { name: 'beurre', category: 'produits laitiers' },

      { name: 'boudin blanc', category: 'viandes et poissons' },
      { name: 'crème liquide vanillé', category: 'produits laitiers' },
      { name: 'moutarde', category: 'assaisonnements et condiments' },
      { name: 'maroilles', category: 'produits laitiers' }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ingredients')
  }
}
