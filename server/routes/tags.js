// routes/tags.js
// const jwtUtils = require('../utils/jwtUtils')
const express = require('express')
const tagsCtrl = require('../controllers/tags.controllers')

const router = express.Router()

router.route('/').get(tagsCtrl.getAllTags)
router.route('/:tagId').get(tagsCtrl.getTagById)

// router.use(jwtUtils.verifyToken)

router.route('/').post(tagsCtrl.addNewTag)
router.route('/:tagId').put(tagsCtrl.updateTag)
router.route('/:tagId').delete(tagsCtrl.deleteTag)

module.exports = router
