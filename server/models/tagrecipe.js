const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TagRecipe extends Model {
    static associate(models) {
      TagRecipe.belongsTo(models.Tag, { foreignKey: 'tagId' })
      TagRecipe.belongsTo(models.Recipe, { foreignKey: 'recipeId' })
    }
  }
  TagRecipe.init(
    {
      tagId: DataTypes.INTEGER,
      recipeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'TagRecipe'
    }
  )
  return TagRecipe
}
