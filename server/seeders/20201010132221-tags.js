'use strict'

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
    await queryInterface.bulkInsert('Tags', [
      { tagname: 'charcuterie' },
      { tagname: 'saison' },
      { tagname: 'été' },
      { tagname: 'printemps' },
      { tagname: 'automne' },
      { tagname: 'hiver' },
      { tagname: 'apéro' },
      { tagname: 'petit déjeuner' },
      { tagname: 'déjeuner' },
      { tagname: 'réconfort' },
      { tagname: 'dinner' },
      { tagname: 'frais' },
      { tagname: 'généreux' },
      { tagname: 'vegan' },
      { tagname: 'healthy' },
      { tagname: 'brunch' },
      { tagname: 'tradition' }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tags', null, {})
  }
}
