const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TagRecipe extends Model {
    static associate(models) {
      TagRecipe.belongsTo(models.Tag, { foreignKey: 'TagId' })
      TagRecipe.belongsTo(models.Recipe, { foreignKey: 'RecipeId' })
    }
  }
  TagRecipe.init(
    {
      TagId: DataTypes.INTEGER,
      RecipeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'TagRecipe'
    }
  )
  return TagRecipe
}
