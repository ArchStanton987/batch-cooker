// routes/inventory.js
const jwtUtils = require('../utils/jwtUtils')
const express = require('express')
const shoppinglistCtrl = require('../controllers/shoppinglist.controllers')

const router = express.Router()

router.use(jwtUtils.verifyToken)

router.route('/user/:userId').get(shoppinglistCtrl.getUserShoppingList)
router.route('/user/:userId').delete(shoppinglistCtrl.clearUserShoppingList)
router.route('/user/:userId/ingredients/').post(shoppinglistCtrl.addIngredientToShoppingList)
router.route('/user/:userId/ingredients/:ingredientId').put(shoppinglistCtrl.updateIngredientFromShoppingList)
router.route('/user/:userId/ingredients/:ingredientId').delete(shoppinglistCtrl.deleteIngredientFromShoppingList)

module.exports = router
