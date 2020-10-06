'use strict'
const { ForeignKeyConstraintError } = require('sequelize')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RecipeIng extends Model {
    static associate(models) {
      RecipeIng.belongsTo(models.Ingredient)
      RecipeIng.belongsTo(models.Recipe)
    }
  }
  RecipeIng.init(
    {
      ingredientId: DataTypes.INTEGER,
      recipeId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unity: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'RecipeIng'
    }
  )
  return RecipeIng
}
