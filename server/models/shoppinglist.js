const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ShoppingList extends Model {
    static associate(models) {
      ShoppingList.belongsTo(models.User, { foreignKey: 'UserId' })
      ShoppingList.belongsTo(models.Ingredient, { foreignKey: 'IngredientId' })
    }
  }
  ShoppingList.init(
    {
      UserId: DataTypes.INTEGER,
      IngredientId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unit: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ShoppingList'
    }
  )
  return ShoppingList
}
