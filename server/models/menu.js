const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      Menu.belongsTo(models.Recipe, { foreignKey: 'RecipeId' })
      Menu.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  Menu.init(
    {
      UserId: DataTypes.INTEGER,
      RecipeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Menu'
    }
  )
  return Menu
}
