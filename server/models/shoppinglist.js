const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ShoppingList extends Model {
    static associate(models) {
      ShoppingList.belongsTo(models.User, { foreignKey: 'userId' })
      ShoppingList.belongsTo(models.Ingredient, { foreignKey: 'IngredientId' })
    }
  }
  ShoppingList.init(
    {
      userId: DataTypes.INTEGER,
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
