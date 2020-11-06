// routes/recipes.js
const jwtUtils = require('../utils/jwtUtils')
const express = require('express')
const recipesCtrl = require('../controllers/recipes.controllers')

const router = express.Router()

router.route('/').get(recipesCtrl.getAllRecipes)
router.route('/:recipeId').get(recipesCtrl.getOneRecipeById)

router.use(jwtUtils.verifyToken)

router.route('/').post(recipesCtrl.addNewRecipe)

router.route('/:recipeId').put(recipesCtrl.updateOneRecipe)
router.route('/:recipeId').delete(recipesCtrl.deleteOneRecipe)

router.route('/users/:userId').get(recipesCtrl.getRecipesOfUser)

router.route('/:recipeId/ingredients').post(recipesCtrl.addIngredientsToRecipe)
router.route('/:recipeId/ingredients').put(recipesCtrl.updateIngredientsFromRecipe)

router.route('/:recipeId/tags').post(recipesCtrl.addTagsInRecipe)
router.route('/:recipeId/tags').put(recipesCtrl.updateTagsFromRecipe)

module.exports = router
