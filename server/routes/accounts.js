// routes/accounts.js
const express = require('express')
const accountsCtrl = require('../controllers/account.controllers')

const router = express.Router()

router.route('/register').post(accountsCtrl.register)

router.route('/login').post(accountsCtrl.login)

module.exports = router
