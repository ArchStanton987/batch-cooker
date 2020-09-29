// routes/inventory.js
const jwtUtils = require('../utils/jwtUtils')
const express = require('express')
const inventoryCtrl = require('../controllers/inventory.controllers')

const router = express.Router()

//router.use(jwtUtils.verifyToken)

router.route('/user/:userId').get(inventoryCtrl.getUserInventory)
router.route('/user/:userId/ingredients').post(inventoryCtrl.addToInventory)
router.route('/user/:userId/ingredients/:ingredientId').put(inventoryCtrl.updateFromInventory)
router.route('/user/:userId/ingredients/:ingredientId').delete(inventoryCtrl.deleteFromInventory)

module.exports = router
