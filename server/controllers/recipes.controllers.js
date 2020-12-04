const models = require('../models')
const { Op } = require('sequelize')
const { sequelize } = require('../models')

module.exports = {
  getAllRecipes: async (req, res) => {
    try {
      const recipes = await models.Recipe.findAll({
        attributes: ['id', 'creatorId', 'name', 'image'],
        include: [{ model: models.Tag, attributes: ['id', 'tagname'], through: { attributes: [] } }]
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
      res.status(201).json({ message: 'Recette créée avec succès. ', RecipeId: createdRecipe.id })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la création de la recette ; ${err}` })
    }
  },
  getOneRecipeById: async (req, res) => {
    const { RecipeId } = req.params

    let isSavedByUser = false
    let isInMenu = false
    let UserId = req.subId || 0

    if (req.isUserIdentified) {
      let save = await models.RecipeSave.findOne({ where: { RecipeId: RecipeId, UserId: UserId } })
      let inMenu = await models.Menu.findOne({ where: { RecipeId: RecipeId, UserId: UserId } })
      if (save) {
        isSavedByUser = true
      }
      if (inMenu) {
        isInMenu = true
      }
    }

    try {
      const recipe = await models.Recipe.findOne({
        where: {
          id: RecipeId
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
      res.status(200).json({ recipe, isSavedByUser: isSavedByUser, isInMenu: isInMenu })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  updateOneRecipe: async (req, res) => {
    const { RecipeId } = req.params
    const { name, image, url, content, guests } = req.body

    try {
      let recipe = await models.Recipe.findByPk(RecipeId, { attributes: ['creatorId'] })
      if (recipe.creatorId !== req.tokenUser) {
        res.status(403).json({ error: 'Action interdite' })
        return
      }
      recipe.id = RecipeId
      recipe.name = name
      recipe.image = image
      recipe.url = url
      recipe.content = content
      recipe.guests = guests
      await recipe.save()
      res.status(200).json({ message: 'La recette a été mise à jour. ' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la mise à jour de la recette :  + ${err}` })
      return
    }
  },
  deleteOneRecipe: async (req, res) => {
    const RecipeId = req.params.RecipeId
    try {
      const recipeToDelete = await models.Recipe.findByPk(RecipeId, {
        attributes: ['creatorId', 'id']
      })
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
    const UserId = parseInt(req.params.UserId, 10)

    if (UserId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }
    try {
      const recipes = await models.Recipe.findAll({
        where: {
          creatorId: UserId
        },
        attributes: ['id', 'creatorId', 'name', 'image'],
        include: [{ model: models.Tag, attributes: ['id', 'tagname'], through: { attributes: [] } }]
      })
      res.status(200).json(recipes)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  addIngredientsToRecipe: async (req, res) => {
    const { RecipeId } = req.params
    let recipeIngredients = req.body

    const recipe = await models.Recipe.findByPk(RecipeId, { attributes: ['creatorId'] })
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
          ingredient.IngredientId = createdIng.id
        } else {
          ingredient.IngredientId = ingredientExists.id
        }
        ingredient.RecipeId = RecipeId
        await models.RecipeIng.create(ingredient)
      })
      res.status(201).json({ message: 'Les ingrédients ont bien été associés à la recette. ' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de l'ajout de l'ingrédient : ${err}` })
    }
  },
  updateIngredientsFromRecipe: async (req, res) => {
    const { RecipeId } = req.params
    let recipeIngredients = req.body

    const recipe = await models.Recipe.findByPk(RecipeId, { attributes: ['creatorId'] })
    if (recipe.creatorId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    await models.RecipeIng.destroy({ where: { RecipeId: RecipeId } })

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
          ingredient.IngredientId = createdIng.id
        } else {
          ingredient.IngredientId = ingredientExists.id
        }
        ingredient.RecipeId = RecipeId
        await models.RecipeIng.create(ingredient)
      })
      res.status(200).json({ message: 'Les ingrédients ont bien été mis à jour.' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la mise à jour des ingrédients : ${err}` })
    }
  },
  addTagsInRecipe: async (req, res) => {
    const { RecipeId } = req.params
    let recipeTags = req.body

    const recipe = await models.Recipe.findByPk(RecipeId, { attributes: ['creatorId'] })
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
          tag.TagId = createdTag.id
        } else {
          tag.TagId = tagExists.id
        }
        tag.RecipeId = RecipeId
        await models.TagRecipe.create(tag)
      })
      res.status(200).json({ message: 'Les tags ont bien été associés à la recette. ' })
    } catch (err) {
      res.status(500).json({ error: `Erreur en associant les tags à la recette : ${err}` })
    }
  },
  updateTagsFromRecipe: async (req, res) => {
    const { RecipeId } = req.params
    let recipeTags = req.body

    const recipe = await models.Recipe.findByPk(RecipeId, { attributes: ['creatorId'] })
    if (recipe.creatorId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    await models.TagRecipe.destroy({ where: { RecipeId: RecipeId } })

    try {
      await recipeTags.forEach(async tag => {
        let tagExists = await models.Tag.findOne({
          where: { tagname: tag.tagname }
        })
        if (!tagExists) {
          let createdTag = await models.Tag.create({
            tagname: tag.tagname
          })
          tag.TagId = createdTag.id
        } else {
          tag.TagId = tagExists.id
        }
        tag.RecipeId = RecipeId
        await models.TagRecipe.create(tag, { fields: ['id', 'TagId', 'RecipeId'] })
      })
      res.status(200).json({ message: 'Les tags de la recette ont bien été mis à jour. ' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de l'association des tags : ${err}` })
    }
  },
  getSavedRecipes: async (req, res) => {
    const UserId = parseInt(req.params.UserId, 10)

    if (UserId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      const savedRecipes = await models.RecipeSave.findAll({
        where: {
          UserId: UserId
        },
        include: [
          {
            model: models.Recipe,
            attributes: ['id', 'creatorId', 'name', 'image'],
            include: [
              { model: models.Tag, attributes: ['id', 'tagname'], through: { attributes: [] } }
            ]
          }
        ]
      })
      res.status(200).json(savedRecipes)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  putRecipeSave: async (req, res) => {
    const UserId = parseInt(req.params.UserId, 10)
    const RecipeId = parseInt(req.params.RecipeId, 10)

    if (UserId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      const existingSave = await models.RecipeSave.findOne({
        where: { UserId: UserId, RecipeId: RecipeId }
      })
      if (existingSave) {
        try {
          await existingSave.destroy()
          res.status(200).json({ message: 'Recette supprimée de vos favoris' })
        } catch (err) {
          res
            .status(500)
            .json({ error: 'Erreur pendant la suppression de la recette de vos favoris ; ' + err })
        }
      } else {
        try {
          await models.RecipeSave.create(
            { UserId: UserId, RecipeId: RecipeId },
            { fields: ['UserId', 'RecipeId'] }
          )
          res.status(201).json({ message: 'Recette enregistée dans vos favoris' })
        } catch (err) {
          res.status(500).json({
            error: "Erreur pendant l'enregistrement de la recette dans vos favoris ; " + err
          })
        }
      }
    } catch (err) {
      res.status(500).json({ error: "L'action n'a pas pu être réalisée" })
    }
  },
  getRandomRecipes: async (req, res) => {
    let limit = parseInt(req.query.limit, 10)
    let UserId = req.subId || 0
    UserId = parseInt(UserId, 10)
    let saves

    try {
      let recipesNumber = await models.Recipe.count()

      if (recipesNumber === 0) {
        res.status(200)
        return
      }

      if (req.isUserIdentified) {
        saves = await models.RecipeSave.findAll({
          where: { UserId: UserId },
          attributes: ['RecipeId']
        })
      }

      if (recipesNumber <= 7) {
        let recipes = await models.Recipe.findAll({
          order: sequelize.random(),
          attributes: ['id', 'creatorId', 'name', 'image'],
          include: [
            { model: models.Tag, attributes: ['id', 'tagname'], through: { attributes: [] } }
          ]
        })
        res.status(200).json({ recipes, saves })
        return
      }

      let idSet = new Set()
      while (idSet.size < limit) {
        idSet.add(Math.floor(Math.random() * recipesNumber) + 1)
      }
      let idArray = [...idSet]

      let recipes = await models.Recipe.findAll({
        where: { id: { [Op.or]: idArray } },
        order: sequelize.random(),
        attributes: ['id', 'creatorId', 'name', 'image'],
        include: [{ model: models.Tag, attributes: ['id', 'tagname'], through: { attributes: [] } }]
      })
      res.status(200).json({ recipes, saves })
    } catch (err) {
      res.status(500).json({ error: 'Erreur en récupérant les recettes ; ' + err })
    }
  },
  searchRecipes: async (req, res) => {
    const { searchfield } = req.query

    if (searchfield.length < 2) {
      return
    }

    let UserId = req.subId || 0
    let saves

    if (req.isUserIdentified) {
      saves = await models.RecipeSave.findAll({
        where: { UserId: UserId },
        attributes: ['RecipeId']
      })
    }

    try {
      const recipes = await models.Recipe.findAll({
        where: {
          [Op.or]: [
            { '$TagRecipes.Tag.tagname$': { [Op.substring]: searchfield } },
            { name: { [Op.substring]: searchfield } }
          ]
        },
        include: [
          { model: models.User, attributes: ['username'] },
          {
            model: models.TagRecipe,
            required: false,
            right: true,
            include: {
              model: models.Tag,
              attributes: ['tagname'],
              required: false,
              right: true
            }
          },
          {
            model: models.Tag,
            attributes: ['id', 'tagname']
          }
        ],
        attributes: ['id', 'creatorId', 'name', 'image']
      })
      res.status(200).json({ recipes, saves })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
}
