const models = require('../models')

module.exports = {
  getAllRecipes: async (req, res) => {
    try {
      const recipes = await models.Recipe.findAll({
        include: [
          { model: models.User, attributes: ['username'] },
          { model: models.Ingredient, attributes: ['name'] },
          { model: models.Tag, attributes: ['tagname'] }
        ]
      })
      res.status(200).json(recipes)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  addNewRecipe: async (req, res) => {
    const { creatorId, name, image, url, content } = req.body
    let newRecipe = { creatorId: creatorId, name: name, image: image, url: url, content: content }
    const existingRecipe = await models.Recipe.findOne({ where: { name: name } })
    if (existingRecipe) {
      res.status(500).json({ error: 'Recipe name already existing' })
      return
    }
    try {
      const createdRecipe = await models.Recipe.create(newRecipe)
      res.status(200).json({ message: 'Recipe successfully created', recipeId: createdRecipe.id })
    } catch (err) {
      res.status(500).json({ error: err + ' ; error when creating recipe' })
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
          { model: models.Ingredient, attributes: ['name'] },
          { model: models.Tag, attributes: ['tagname'] }
        ]
      })
      if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' })
        return
      }
      res.status(200).json(recipe)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  updateOneRecipe: async (req, res) => {
    const { recipeId } = req.params
    const { name, image, url, content } = req.body
    try {
      let recipe = await models.Recipe.findByPk(recipeId)
      recipe.id = recipeId
      recipe.name = name
      recipe.image = image
      recipe.url = url
      recipe.content = content
      await recipe.save()
      res.status(200).json({ message: 'Recipe successfully updated' })
    } catch (err) {
      res.status(500).json({ error: 'error when updating recipe data : ' + err })
      return
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
      const recipes = await models.Recipe.findAll({
        where: {
          creatorId: userId
        },
        include: [{ model: models.Ingredient, attributes: ['name'] }]
      })
      res.status(200).json(recipes)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  addIngredientInRecipe: async (req, res) => {
    const recipeId = parseInt(req.params.recipeId, 10)
    const { name, category, quantity, unity } = req.body
    const newIngredient = { name: name, category: category }

    const ingredientExists = await models.Ingredient.findOne({
      where: { name: name, category: category }
    })
    if (!ingredientExists) {
      try {
        let createdIngredient = await models.Ingredient.create(newIngredient)
        newIngredient.id = createdIngredient.id
      } catch (err) {
        res.status(500).json({ error: 'Error creating the ingredient : ' + err })
        return
      }
    }
    if (ingredientExists) {
      newIngredient.id = ingredientExists.id
    }
    try {
      await models.RecipeIng.create({
        ingredientId: newIngredient.id,
        recipeId: recipeId,
        quantity: quantity,
        unity: unity
      })
      res.status(200).json({ message: 'Ingredient successfully associated with recipe' })
    } catch (err) {
      res.status(500).json({ error: 'Error associating ingredient to recipe : ' + err })
    }
  },
  getIngredientFromRecipe: async (req, res) => {
    const { recipeId, ingredientId } = req.params
    try {
      const ingredient = await models.RecipeIng.findOne({
        where: { recipeId: recipeId, ingredientId: ingredientId },
        include: [{ model: models.Ingredient }]
      })
      if (!ingredient) {
        res.status(404).json({ error: 'Ingredient not found' })
        return
      }
      res.status(200).json(ingredient)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  updateIngredientFromRecipe: async (req, res) => {
    const { recipeId, ingredientId } = req.params
    const { quantity, unity } = req.body
    try {
      const ingredient = await models.RecipeIng.findOne({
        where: { recipeId: recipeId, ingredientId: ingredientId }
      })
      if (!ingredient) {
        res.status(404).json({ error: 'Ingredient not found' })
        return
      }
      ingredient.quantity = quantity
      ingredient.unity = unity
      await ingredient.save()
      res.status(200).json(ingredient)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  deleteIngredientFromRecipe: async (req, res) => {
    const { recipeId, ingredientId } = req.params
    try {
      const ingredient = await models.RecipeIng.findOne({
        where: { recipeId: recipeId, ingredientId: ingredientId }
      })
      if (!ingredient) {
        res.status(404).json({ error: 'Ingredient not found' })
        return
      }
      await ingredient.destroy()
      res.status(200).json({ message: 'Ingredient deleted' })
    } catch (err) {
      res.status(500).json(err)
    }
  },
  addTagInRecipe: async (req, res) => {
    const recipeId = parseInt(req.params.recipeId, 10)
    const tagname = req.body.tagname.toLowerCase()
    const newTag = { tagname: tagname }

    const tagExists = await models.Tag.findOne({
      where: { tagname: tagname }
    })
    if (!tagExists) {
      try {
        let createdTag = await models.Tag.create(newTag)
        newTag.id = createdTag.id
      } catch (err) {
        res.status(500).json({ error: 'Error creating the tag : ' + err })
        return
      }
    }
    if (tagExists) {
      newTag.id = tagExists.id
    }
    try {
      let newTagRecipe = await models.TagRecipe.create({
        tagId: newTag.id,
        recipeId: recipeId
      })
      res.status(200).json({
        message: 'Tag successfully associated with recipe',
        tagRecipe: newTagRecipe.id
      })
    } catch (err) {
      res.status(500).json({ error: 'Error associating tag to recipe : ' + err })
    }
  },
  getTagFromRecipe: async (req, res) => {},
  updateTagFromRecipe: async (req, res) => {},
  deleteTagFromRecipe: async (req, res) => {}
}
