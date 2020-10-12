// routes/tags.js

const express = require('express')
const tagsCtrl = require('../controllers/tags.controllers')

const router = express.Router()

// router.use(jwtUtils.verifyToken)

router.route('/').get(tagsCtrl.getAllTags)
router.route('/').post(tagsCtrl.addNewTag)
router.route('/:tagId').get(tagsCtrl.getTagById)
router.route('/:tagId').put(tagsCtrl.updateTag)
router.route('/:tagId').delete(tagsCtrl.deleteTag)

module.exports = router
