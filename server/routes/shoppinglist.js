// routes/inventory.js
const jwtUtils = require('../utils/jwtUtils')
const express = require('express')
const shoppinglistCtrl = require('../controllers/shoppinglist.controllers')

const router = express.Router()

router.use(jwtUtils.verifyToken)

router.route('/user/:UserId').get(shoppinglistCtrl.getUserShoppingList)
router.route('/user/:UserId').delete(shoppinglistCtrl.clearUserShoppingList)
router.route('/user/:UserId/ingredients/').post(shoppinglistCtrl.addIngredientToShoppingList)
router
  .route('/user/:UserId/ingredients/:ingredientId')
  .put(shoppinglistCtrl.updateIngredientFromShoppingList)
router
  .route('/user/:UserId/ingredients/:ingredientId')
  .delete(shoppinglistCtrl.deleteIngredientFromShoppingList)

router.route('/user/:UserId/menu/').post(shoppinglistCtrl.addMenuIngredientsToShoppinglist)

module.exports = router
