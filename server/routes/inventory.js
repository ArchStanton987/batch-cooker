// routes/inventory.js
const jwtUtils = require('../utils/jwtUtils')
const express = require('express')
const inventoryCtrl = require('../controllers/inventory.controllers')

const router = express.Router()

router.use(jwtUtils.verifyToken)

router.route('/user/:UserId').get(inventoryCtrl.getUserInventory)
router.route('/user/:UserId/ingredients').post(inventoryCtrl.addToInventory)
router.route('/user/:UserId/ingredients/:ingredientId').put(inventoryCtrl.updateFromInventory)
router.route('/user/:UserId/ingredients/:ingredientId').delete(inventoryCtrl.deleteFromInventory)

module.exports = router
