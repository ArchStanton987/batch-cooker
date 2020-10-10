'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      Recipe.belongsToMany(models.Ingredient, { through: models.RecipeIng })
      Recipe.belongsTo(models.User, { foreignKey: 'creatorId' })
      Recipe.hasMany(models.RecipeIng, { onDelete: 'CASCADE' })
    }
  }
  Recipe.init(
    {
      creatorId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: true },
      url: { type: DataTypes.STRING, allowNull: true, unique: true },
      content: { type: DataTypes.STRING, allowNull: true },
      guests: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 4 }
    },
    {
      sequelize,
      modelName: 'Recipe'
    }
  )
  return Recipe
}
