const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TagRecipe extends Model {
    static associate(models) {
      // define association here
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
