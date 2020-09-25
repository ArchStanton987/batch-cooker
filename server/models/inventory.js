const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      Inventory.belongsTo(models.User)
      Inventory.belongsTo(models.Ingredient)
    }
  }
  Inventory.init(
    {
      quantity: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Inventory'
    }
  )
  return Inventory
}
