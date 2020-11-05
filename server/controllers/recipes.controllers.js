const models = require('../models')

module.exports = {
  getAllRecipes: async (req, res) => {
    try {
      const recipes = await models.Recipe.findAll({
        include: [
          { model: models.User, attributes: ['username'] },
          { model: models.Ingredient, attributes: ['name', 'category'] },
          { model: models.Tag, attributes: ['tagname'] }
        ]
      })
      res.status(200).json(recipes)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  addNewRecipe: async (req, res) => {
    const { creatorId, name, image, url, content, guests } = req.body
    let newRecipe = {
      creatorId: creatorId,
      guests: guests,
      name: name,
      image: image,
      url: url,
      content: content
    }

    const parsedId = parseInt(creatorId, 10)
    if (parsedId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      const createdRecipe = await models.Recipe.create(newRecipe)
      res.status(201).json({ message: 'Recette créée avec succès', recipeId: createdRecipe.id })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la création de la recette ; ${err}` })
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
          { model: models.Ingredient, attributes: ['name', 'category'] },
          { model: models.Tag, attributes: ['tagname'] }
        ]
      })
      if (!recipe) {
        res.status(404).json({ error: 'Recette inconnue' })
        return
      }
      res.status(200).json(recipe)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  updateOneRecipe: async (req, res) => {
    const { recipeId } = req.params
    const { name, image, url, content, guests } = req.body

    try {
      let recipe = await models.Recipe.findByPk(recipeId, { attributes: ['creatorId'] })
      if (recipe.creatorId !== req.tokenUser) {
        res.status(403).json({ error: 'Action interdite' })
        return
      }
      recipe.id = recipeId
      recipe.name = name
      recipe.image = image
      recipe.url = url
      recipe.content = content
      recipe.guests = guests
      await recipe.save()
      res.status(200).json({ message: 'La recette a été mise à jour.' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la mise à jour de la recette :  + ${err}` })
      return
    }
  },
  deleteOneRecipe: async (req, res) => {
    const recipeId = req.params.recipeId
    try {
      const recipeToDelete = await models.Recipe.findByPk(recipeId, { attributes: ['creatorId'] })
      if (recipeToDelete.creatorId !== req.tokenUser) {
        res.status(403).json({ error: 'Action interdite' })
        return
      }
      await recipeToDelete.destroy()
      res.status(200).json({ message: 'La recette a été supprimée. ' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la suppression de la recette : ${err}` })
    }
  },
  getRecipesOfUser: async (req, res) => {
    const userId = parseInt(req.params.userId, 10)

    if (userId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }
    try {
      const recipes = await models.Recipe.findAll({
        where: {
          creatorId: userId
        },
        include: [
          { model: models.User, attributes: ['username'] },
          { model: models.Ingredient, attributes: ['name', 'category'] },
          { model: models.Tag, attributes: ['tagname'] }
        ]
      })
      res.status(200).json(recipes)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  addIngredientsToRecipe: async (req, res) => {
    const { recipeId } = req.params
    let recipeIngredients = req.body

    const recipe = await models.Recipe.findByPk(recipeId, { attributes: ['creatorId'] })
    if (recipe.creatorId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      await recipeIngredients.forEach(async ingredient => {
        let ingredientExists = await models.Ingredient.findOne({
          where: { name: ingredient.name, category: ingredient.category }
        })
        if (!ingredientExists) {
          let createdIng = await models.Ingredient.create({
            name: ingredient.name,
            category: ingredient.category
          })
          ingredient.ingredientId = createdIng.id
        } else {
          ingredient.ingredientId = ingredientExists.id
        }
        ingredient.recipeId = recipeId
        await models.RecipeIng.create(ingredient)
      })
      res.status(201).json({ message: 'Les ingrédients ont bien été associés à la recette. ' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de l'ajout de l'ingrédient : ${err}` })
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
        res.status(404).json({ error: 'Ingredient inconnu' })
        return
      }
      res.status(200).json(ingredient)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  updateIngredientsFromRecipe: async (req, res) => {
    const { recipeId } = req.params
    let recipeIngredients = req.body

    const recipe = await models.Recipe.findByPk(recipeId, { attributes: ['creatorId'] })
    if (recipe.creatorId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    await models.RecipeIng.destroy({ where: { recipeId: recipeId } })

    try {
      await recipeIngredients.forEach(async ingredient => {
        let ingredientExists = await models.Ingredient.findOne({
          where: { name: ingredient.name, category: ingredient.category }
        })
        if (!ingredientExists) {
          let createdIng = await models.Ingredient.create({
            name: ingredient.name,
            category: ingredient.category
          })
          ingredient.ingredientId = createdIng.id
        } else {
          ingredient.ingredientId = ingredientExists.id
        }
        ingredient.recipeId = recipeId
        await models.RecipeIng.create(ingredient)
      })
      res.status(200).json({ message: 'Les ingrédients ont bien été mis à jour.' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la mise à jour des ingrédients : ${err}` })
    }
  },
  deleteIngredientFromRecipe: async (req, res) => {
    const { recipeId, ingredientId } = req.params

    const recipe = await models.Recipe.findByPk(recipeId)
    if (recipe.creatorId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      const ingredient = await models.RecipeIng.findOne({
        where: { recipeId: recipeId, ingredientId: ingredientId }
      })
      if (!ingredient) {
        res.status(404).json({ error: 'Ingredient inconnu' })
        return
      }
      await ingredient.destroy()
      res.status(200).json({ message: 'Ingredient supprimé' })
    } catch (err) {
      res.status(500).json(err)
    }
  },
  addTagsInRecipe: async (req, res) => {
    const { recipeId } = req.params
    let recipeTags = req.body

    const recipe = await models.Recipe.findByPk(recipeId, { attributes: ['creatorId'] })
    if (recipe.creatorId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      await recipeTags.forEach(async tag => {
        let tagExists = await models.Tag.findOne({
          where: { tagname: tag.tagname }
        })
        if (!tagExists) {
          let createdTag = await models.Tag.create({
            tagname: tag.tagname
          })
          tag.tagId = createdTag.id
        } else {
          tag.tagId = tagExists.id
        }
        tag.recipeId = recipeId
        await models.TagRecipe.create(tag)
      })
      res.status(200).json({ message: 'Les tags ont bien été associés à la recette. ' })
    } catch (err) {
      res.status(500).json({ error: `Erreur en associant les tags à la recette : ${err}` })
    }
  },
  getTagFromRecipe: async (req, res) => {},
  updateTagsFromRecipe: async (req, res) => {
    const { recipeId } = req.params
    let recipeTags = req.body

    const recipe = await models.Recipe.findByPk(recipeId, { attributes: ['creatorId'] })
    if (recipe.creatorId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    await models.TagRecipe.destroy({ where: { recipeId: recipeId } })

    try {
      await recipeTags.forEach(async tag => {
        let tagExists = await models.Tag.findOne({
          where: { tagname: tag.tagname }
        })
        if (!tagExists) {
          let createdTag = await models.Tag.create({
            tagname: tag.tagname
          })
          tag.tagId = createdTag.id
        } else {
          tag.tagId = tagExists.id
        }
        tag.recipeId = recipeId
        await models.TagRecipe.create(tag)
      })
      res.status(200).json({ message: 'Les tags de la recette ont bien été mis à jour. ' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de l'association des tags : ${err}` })
    }
  },
  deleteTagFromRecipe: async (req, res) => {}
}
