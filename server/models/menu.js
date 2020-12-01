const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      Menu.belongsTo(models.Recipe, { foreignKey: 'recipeId' })
      Menu.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  Menu.init(
    {
      UserId: DataTypes.INTEGER,
      recipeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Menu'
    }
  )
  return Menu
}
