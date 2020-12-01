// routes/recipes.js
const jwtUtils = require('../utils/jwtUtils')
const userUtils = require('../utils/usersUtils')
const express = require('express')
const recipesCtrl = require('../controllers/recipes.controllers')
const menuCtrl = require('../controllers/menu.controllers')

const router = express.Router()

router.use(userUtils.addUserIdToReq)

// router.route('/').get(recipesCtrl.getAllRecipes)
router.route('/search?').get(recipesCtrl.searchRecipes)
router.route('/random').get(recipesCtrl.getRandomRecipes)

router.route('/:recipeId').get(recipesCtrl.getOneRecipeById)

router.use(jwtUtils.verifyToken)

router.route('/').post(recipesCtrl.addNewRecipe)

router.route('/:recipeId').put(recipesCtrl.updateOneRecipe)
router.route('/:recipeId').delete(recipesCtrl.deleteOneRecipe)

router.route('/users/:UserId').get(recipesCtrl.getRecipesOfUser)

router.route('/saves/users/:UserId').get(recipesCtrl.getSavedRecipes)
router.route('/saves/:recipeId/users/:UserId').put(recipesCtrl.putRecipeSave)

router.route('/menu/users/:UserId').get(menuCtrl.getUserMenu)
router.route('/menu/users/:UserId').delete(menuCtrl.clearUserMenu)
router.route('/menu/:recipeId/users/:UserId').put(menuCtrl.putRecipeMenu)
router.route('/menu/users/:UserId/ingredients').get(menuCtrl.getAllIngredientsFromMenu)

router.route('/:recipeId/ingredients').post(recipesCtrl.addIngredientsToRecipe)
router.route('/:recipeId/ingredients').put(recipesCtrl.updateIngredientsFromRecipe)

router.route('/:recipeId/tags').post(recipesCtrl.addTagsInRecipe)
router.route('/:recipeId/tags').put(recipesCtrl.updateTagsFromRecipe)

module.exports = router
