// routes/recipes.js
// const jwtUtils = require('../utils/jwtUtils')
const express = require('express')
const recipesCtrl = require('../controllers/recipes.controllers')

const router = express.Router()

router.route('/').get(recipesCtrl.getAllRecipes)
router.route('/').post(recipesCtrl.addNewRecipe)
router.route('/:recipeId').get(recipesCtrl.getOneRecipeById)
router.route('/:recipeId/ingredients/:ingredientId').get(recipesCtrl.getIngredientFromRecipe)
router.route('/:recipeId/tags/:tagId').get(recipesCtrl.getTagFromRecipe)

// router.use(jwtUtils.verifyToken)

router.route('/:recipeId').put(recipesCtrl.updateOneRecipe)
router.route('/:recipeId').delete(recipesCtrl.deleteOneRecipe)

router.route('/users/:userId').get(recipesCtrl.getRecipesOfUser)

router.route('/:recipeId/ingredients').post(recipesCtrl.addIngredientInRecipe)
router.route('/:recipeId/ingredients/:ingredientId').put(recipesCtrl.updateIngredientFromRecipe)
router.route('/:recipeId/ingredients/:ingredientId').delete(recipesCtrl.deleteIngredientFromRecipe)

router.route('/:recipeId/tags').post(recipesCtrl.addTagInRecipe)
router.route('/:recipeId/tags/:tagId').put(recipesCtrl.updateTagFromRecipe)
router.route('/:recipeId/tags/:tagId').delete(recipesCtrl.deleteTagFromRecipe)

module.exports = router
