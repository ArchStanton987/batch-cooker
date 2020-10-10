'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      creatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      name: { type: Sequelize.STRING, allowNull: false },
      image: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      },
      url: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
        unique: true
      },
      content: {
        type: Sequelize.STRING(3000),
        defaultValue: null,
        allowNull: true
      },
      guests: {
        type: Sequelize.INTEGER,
        defaultValue: 4,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Recipes')
  }
}
