const models = require('../models')
const { Op } = require('sequelize')

module.exports = {
  getAllrecipes: async (req, res) => {
    try {
      const recipes = await models.Recipe.findAll({
        include: [
          { model: models.User, attributes: ['username'] },
          { model: models.Ingredient, attributes: ['name'] }
        ]
      })
      res.status(200).json(recipes)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  addNewRecipe: async (req, res) => {
    const { creatorId, name, image, url, content } = req.body
    const ingredients = req.body.ingredients
    let newRecipe = { creatorId: creatorId, name: name, image: image, url: url, content: content }
    let newRecipeId
    try {
      let createdRecipe = await models.Recipe.create(newRecipe)
      newRecipeId = await createdRecipe.id
    } catch (err) {
      res.status(500).json({ error: err + ' ; error when creating recipe' })
    }
    try {
      ingredients.forEach(async ingredient => {
        await models.RecipeIng.create({
          ingredientId: ingredient.ingredientId,
          recipeId: newRecipeId,
          quantity: ingredient.quantity,
          unity: ingredient.unity
        })
      })
      res.status(200).json({ message: 'Recipe successfully created' })
    } catch (err) {
      res.status(500).json({ error: err + ' ; error when associating ingredients to recipe' })
    }
  },
  getOneRecipeById: async (req, res) => {
    const { recipeId } = req.params
    try {
      const recipe = await models.Recipe.findOne({
        where: {
          id: recipeId
        },
        include: [
          { model: models.User, attributes: ['username'] },
          { model: models.Ingredient, attributes: ['name'] }
        ]
      })
      res.status(200).json(recipe)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  updateOneRecipe: async (req, res) => {
    const { recipeId } = req.params
    const { creatorId, name, image, url, content } = req.body
    const newIngredients = req.body.ingredients
    try {
      let recipe = await models.Recipe.findByPk(recipeId)
      recipe.id = recipeId
      recipe.creatorId = creatorId
      recipe.name = name
      recipe.image = image
      recipe.url = url
      recipe.content = content
      await recipe.save()
    } catch (err) {
      res.status(500).json({ error: err + ' ; error when updating recipe data' })
      return
    }
    try {
      const previousIngredients = await models.RecipeIng.findAll({
        where: {
          recipeId: recipeId
        }
      })
      for (let i = 0; i < previousIngredients.length; i++) {
        for (let j = 0; j < newIngredients.length; j++) {
          if (previousIngredients[i].id === newIngredients[j].recipeIng) {
            let ingredientToUpdate = await models.RecipeIng.findByPk(previousIngredients[i].id)
            ingredientToUpdate.ingredientId = newIngredients[j].ingredientId
            ingredientToUpdate.quantity = newIngredients[j].quantity
            ingredientToUpdate.unity = newIngredients[j].unity
            newIngredients[j].updated = true
            await ingredientToUpdate.save()
          }
        }
      }
      newIngredients.forEach(async ingredient => {
        if (!ingredient.hasOwnProperty('updated')) {
          await models.RecipeIng.create({
            ingredientId: ingredient.ingredientId,
            recipeId: recipeId,
            quantity: ingredient.quantity,
            unity: ingredient.unity
          })
        }
      })
      res.status(200).json({ message: 'ingredients successfully associated with recipe' })
    } catch (err) {
      res.status(500).json({ error: err + ' ; error when associating ingredients to recipe' })
    }
  },
  deleteOneRecipe: async (req, res) => {
    const recipeId = req.params.recipeId
    try {
      const recipeToDelete = await models.Recipe.findByPk(recipeId)
      await recipeToDelete.destroy()
      res.status(200).json({ message: 'Recipe successfully deleted' })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  getRecipesOfUser: async (req, res) => {
    const userId = req.params.userId
    try {
      const recipies = await models.Recipe.findAll({
        where: {
          creatorId: userId
        }
      })
      res.status(200).json({ recipies })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
}
