const models = require('../models')

module.exports = {
  getAllTags: async (req, res) => {
    try {
      const tags = await models.Tag.findAll()
      res.status(200).json(tags)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  addNewTag: async (req, res) => {
    const tagname = req.body.tagname.toLowerCase()
    try {
      await models.Tag.create({ tagname: tagname })
      res.status(201).json({ message: 'Le tag a bien été créé' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la création du tag : ${err}` })
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
    const { tagId } = req.params
    const { tagname } = req.body
    try {
      let tag = await models.Tag.findByPk(tagId)
      tag.tagname = tagname
      console.log(tag)
      await tag.save()
      res.status(200).json({ message: 'Le tag a bien été mis à jour.' })
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la mis à jour du tag : ${err}` })
    }
  },
  deleteTag: async (req, res) => {
    const { tagId } = req.params
    try {
      let tag = await models.Tag.findByPk(tagId)
      await tag.destroy()
      res.status(200).json({ message: 'Le tag a bien été supprimé. ' })
    } catch (err) {
      res.status(500).send({ error: err })
    }
  }
}
