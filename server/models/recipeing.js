const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RecipeIng extends Model {
    static associate(models) {
      RecipeIng.belongsTo(models.Ingredient, { foreignKey: 'ingredientId' })
      RecipeIng.belongsTo(models.Recipe, { foreignKey: 'recipeId' })
    }
  }
  RecipeIng.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      ingredientId: DataTypes.INTEGER,
      recipeId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unit: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'RecipeIng'
    }
  )
  return RecipeIng
}
