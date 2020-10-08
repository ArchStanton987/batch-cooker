// routes/recipes.js
const jwtUtils = require('../utils/jwtUtils')
const express = require('express')
const recipesCtrl = require('../controllers/recipes.controllers')

const router = express.Router()

// router.use(jwtUtils.verifyToken)

router.route('/').get(recipesCtrl.getAllRecipes)
router.route('/').post(recipesCtrl.addNewRecipe)
router.route('/:recipeId').get(recipesCtrl.getOneRecipeById)
router.route('/:recipeId').put(recipesCtrl.updateOneRecipe)
router.route('/:recipeId').delete(recipesCtrl.deleteOneRecipe)

router.route('/users/:userId').get(recipesCtrl.getRecipesOfUser)

router.route('/:recipeId/ingredients').post(recipesCtrl.addIngredientInRecipe)
router.route('/:recipeId/ingredients/:ingredientId').get(recipesCtrl.getIngredientFromRecipe)
router.route('/:recipeId/ingredients/:ingredientId').put(recipesCtrl.updateIngredientFromRecipe)
router.route('/:recipeId/ingredients/:ingredientId').delete(recipesCtrl.deleteIngredientFromRecipe)


module.exports = router
