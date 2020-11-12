const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      Inventory.belongsTo(models.User, { foreignKey: 'userId' })
      Inventory.belongsTo(models.Ingredient, { foreignKey: 'ingredientId' })
    }
  }
  Inventory.init(
    {
      quantity: DataTypes.INTEGER,
      unity: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Inventory'
    }
  )
  return Inventory
}
