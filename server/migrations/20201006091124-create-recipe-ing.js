module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RecipeIngs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IngredientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ingredients',
          key: 'id'
        }
      },
      RecipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Recipes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      quantity: { type: Sequelize.INTEGER, allowNull: true },
      unit: { type: Sequelize.STRING, allowNull: true },
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
    await queryInterface.dropTable('RecipeIngs')
  }
}
