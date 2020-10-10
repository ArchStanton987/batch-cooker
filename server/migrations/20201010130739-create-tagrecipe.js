module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TagRecipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        }
      },
      recipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Recipes',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TagRecipes');
  }
};