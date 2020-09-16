const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Inventory.belongsTo(models.User, { foreignKey: 'userId' })
      // Inventory.belongsTo(models.Ingregient, { foreignKey: 'ingredientId' })
    }
  }
  Inventory.init(
    {
      userId: DataTypes.INTEGER,
      ingredientId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Inventory'
    }
  )
  Inventory.associate = models => {
    Inventory.belongsTo(models.User, { foreignKey: 'userId' })
    Inventory.belongsTo(models.Ingredient, { foreignKey: 'ingredientId' })
  }
  return Inventory
}
