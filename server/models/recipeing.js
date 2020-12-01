const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RecipeIng extends Model {
    static associate(models) {
      RecipeIng.belongsTo(models.Ingredient, { foreignKey: 'IngredientId' })
      RecipeIng.belongsTo(models.Recipe, { foreignKey: 'RecipeId' })
    }
  }
  RecipeIng.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      IngredientId: DataTypes.INTEGER,
      RecipeId: DataTypes.INTEGER,
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
