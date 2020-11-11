const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      Ingredient.belongsToMany(models.User, { through: models.Inventory, foreignKey: 'ingredientId' })
      Ingredient.belongsToMany(models.User, { through: models.ShoppingList, foreignKey: 'ingredientId' })
      Ingredient.belongsToMany(models.Recipe, { through: models.RecipeIng, foreignKey: 'ingredientId' })
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
