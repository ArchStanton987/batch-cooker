const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Tag.bulkCreate([
      { tagname: 'saison' },
      { tagname: 'été' },
      { tagname: 'tradition' },
      { tagname: 'risotto' },
      { tagname: 'gourmand' },
      { tagname: 'Italie' },
      { tagname: 'facile' },
      { tagname: 'dessert' },
      { tagname: 'douceur' },
      { tagname: 'généreux' }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tags', null, {})
  }
}
