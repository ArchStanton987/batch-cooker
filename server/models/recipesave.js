const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RecipeSave extends Model {
    static associate(models) {
      RecipeSave.belongsTo(models.Recipe, { foreignKey: 'recipeId' })
      RecipeSave.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  RecipeSave.init(
    {
      recipeId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'RecipeSave'
    }
  )
  return RecipeSave
}
