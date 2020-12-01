const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RecipeSave extends Model {
    static associate(models) {
      RecipeSave.belongsTo(models.Recipe, { foreignKey: 'RecipeId' })
      RecipeSave.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  RecipeSave.init(
    {
      RecipeId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'RecipeSave'
    }
  )
  return RecipeSave
}
