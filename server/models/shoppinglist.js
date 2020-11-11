const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ShoppingList extends Model {
    static associate(models) {
      ShoppingList.belongsTo(models.User)
      ShoppingList.belongsTo(models.Ingredient)
    }
  }
  ShoppingList.init(
    {
      userId: DataTypes.INTEGER,
      ingredientId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unity: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ShoppingList'
    }
  )
  return ShoppingList
}
