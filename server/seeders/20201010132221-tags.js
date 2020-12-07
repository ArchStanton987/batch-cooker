const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Tag.bulkCreate(
      [
        { id: 1, tagname: 'saison' },
        { id: 2, tagname: 'été' },
        { id: 3, tagname: 'tradition' },
        { id: 4, tagname: 'risotto' },
        { id: 5, tagname: 'gourmand' },
        { id: 6, tagname: 'Italie' },
        { id: 7, tagname: 'facile' },
        { id: 8, tagname: 'dessert' },
        { id: 9, tagname: 'douceur' },
        { id: 10, tagname: 'généreux' }
      ],
      {
        fields: ['id', 'tagname']
      }
    )
    const existingRows = await models.Tag.count();
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Tags_id_seq" RESTART WITH ${existingRows + 1}`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tags', null, {})
  }
}
