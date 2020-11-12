const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      Ingredient.belongsToMany(models.User, { through: models.Inventory })
      Ingredient.belongsToMany(models.User, { through: models.ShoppingList })
      Ingredient.belongsToMany(models.Recipe, { through: models.RecipeIng })
    }
  }
  Ingredient.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Ingredient'
    }
  )
  return Ingredient
}
