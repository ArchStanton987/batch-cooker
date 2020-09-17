// routes/users.js
const express = require('express')
const usersCtrl = require('../controllers/users.controllers')

const router = express.Router()

router.route('/').get(usersCtrl.getAllUsers)
router.route('/:id').get(usersCtrl.getOneUserById)
router.route('/:id').put(usersCtrl.updateOneUser)
router.route('/:id').delete(usersCtrl.deleteOneUser)

module.exports = router
