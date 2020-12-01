const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      Inventory.belongsTo(models.User, { foreignKey: 'UserId' })
      Inventory.belongsTo(models.Ingredient, { foreignKey: 'IngredientId' })
    }
  }
  Inventory.init(
    {
      quantity: DataTypes.INTEGER,
      unit: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Inventory'
    }
  )
  return Inventory
}
