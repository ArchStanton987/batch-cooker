const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Ingredient.bulkCreate([
      { name: 'poulet' },
      { name: 'tomate' },
      { name: 'poivron' },
      { name: 'oignon' },
      { name: 'ail' },
      { name: 'vin blanc' },
      { name: 'bouquet garni' },
      { name: "huile d'olive" },
      { name: 'sel' },
      { name: 'poivre' },
      { name: 'riz à risotto' },
      { name: 'bouillon de volaille' },
      { name: 'crème fraiche' },
      { name: 'échalote' },
      { name: 'parmesan' },
      { name: 'chorizo' },
      { name: 'paprika' },
      { name: 'magret de canard' },
      { name: 'miel' },
      { name: 'vinaigre balsamique' },
      { name: 'pâtes' },
      { name: 'oeufs' },
      { name: 'lardons' },
      { name: 'filet de hareng' },
      { name: 'pomme de terre' },
      { name: 'vinaigre de vin' },
      { name: 'pâte brisée' },
      { name: 'pomme' },
      { name: 'sucre vanillé' },
      { name: 'beurre' },
      { name: 'boudin blanc' },
      { name: 'crème liquide' },
      { name: 'moutarde' },
      { name: 'maroilles' }
    ])
    const existingRows = await models.Ingredient.count()
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Ingredients_id_seq" RESTART WITH ${existingRows + 1}`
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ingredients')
  }
}
