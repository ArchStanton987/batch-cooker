const models = require('../models')

module.exports = {
  getAllTags: async (req, res) => {
    try {
      const tags = await models.Tag.findAll()
      res.statue(200).json(tags)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  addNewTag: async (req, res) => {
    const { tagname } = req.body
    try {
      await models.Tag.create(tagname)
      res.status(200).json({ message: 'Tag successfully created' })
    } catch (err) {
      res.status(500).json({ error: 'Error creating tag ; ' + err })
    }
  },
  getTagById: async (req, res) => {
    const tagId = req.params.tagId
    try {
      const tag = models.Tag.findByPk(tagId)
      res.status(200).json(tag)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  updateTag: async (req, res) => {
    const { tagId } = req.params.tagId
    const { tagname } = req.body
    try {
      let tag = await models.Tag.findByPk(tagId)
      tag.tagname = tagname
      await tag.save()
      res.status(200).json({ message: 'Tag successfully updated' })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  deleteTag: async (req, res) => {
    const { tagId } = req.params.tagId
    try {
      let tag = await models.Tag.findByPk(tagId)
      await tag.destroy()
      res.status(200).json({ message: 'Tag successfully deleted' })
    } catch (err) {
      res.status(500).send({ error: err })
    }
  }
}
