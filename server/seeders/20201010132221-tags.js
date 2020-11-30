module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tags', [
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
