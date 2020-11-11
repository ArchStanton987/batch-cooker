// routes/inventory.js
const jwtUtils = require('../utils/jwtUtils')
const express = require('express')
const shoppinglistCtrl = require('../controllers/shoppinglist.controllers')

const router = express.Router()

router.use(jwtUtils.verifyToken)

router.route('/user/:userId').get(shoppinglistCtrl.getUserShoppingList)

module.exports = router
