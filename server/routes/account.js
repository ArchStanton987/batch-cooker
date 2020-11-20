// routes/accounts.js
const express = require('express')
const accountsCtrl = require('../controllers/account.controllers')
const jwtUtils = require('../utils/jwtUtils')

const router = express.Router()

router.route('/register').post(accountsCtrl.register)

router.route('/login').post(accountsCtrl.login)

router.use(jwtUtils.checkExpired)

router.route('/logout').post(accountsCtrl.logout)

module.exports = router
