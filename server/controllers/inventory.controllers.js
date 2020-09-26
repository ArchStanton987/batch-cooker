const models = require('../models')
const { Op } = require('sequelize')
const { isValidElement } = require('react')

module.exports = {
  getUserInventory: async (req, res) => {
    const userId = req.params.userId
    try {
      const user = await models.User.findByPk(userId)
      if (!user) {
        res.status(404).json({ error: 'Unknown user' })
      } else {
        const inventory = await models.Inventory.findAll({
          where: { userId: userId },
          attributes: ['quantity', 'ingredientId'],
          include: [{ model: models.Ingredient, attributes: ['name', 'category'] }]
        })
        res.status(200).json(inventory)
      }
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  addToInventory: async (req, res) => {
    const userId = parseInt(req.params.userId, 10)
    const ingredientId = parseInt(req.params.ingredientId, 10)
    const quantity = req.body.quantity
    let ingredient = { userId: userId, ingredientId: ingredientId, quantity: quantity }

    const user = await models.User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'Unknown user' })
      return
    }
    const ingredientInInventory = await models.Inventory.findOne({
      where: { [Op.and]: [{ userId: userId }, { ingredientId: ingredientId }] }
    })
    try {
      if (!ingredientInInventory) {
        let newIngredient = await models.Inventory.create(ingredient, {
          fields: ['userId', 'ingredientId', 'quantity']
        })
        res.status(200).json(newIngredient)
        return
      }
      if (ingredientInInventory) {
        ingredientInInventory.quantity += quantity
        await ingredientInInventory.save()
        res.status(200).json(ingredientInInventory)
        return
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },
  updateFromInventory: async (req, res) => {
    const userId = req.params.userId
    const ingredientId = req.params.ingredientId
    const quantity = req.body.quantity
    try {
      const user = await models.User.findByPk(userId)
      if (!user) {
        res.status(404).json({ error: 'Unknown user' })
        return
      }
      const inventory = await models.Inventory.findOne({
        where: { [Op.and]: [{ userId: userId }, { ingredientId: ingredientId }] }
      })
      inventory.quantity += quantity
      await inventory.save()
      res.status(200).json(inventory)
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },
  deleteFromInventory: async (req, res) => {
    const userId = req.params.userId
    const ingredientId = req.params.ingredientId
    try {
      const user = await models.User.findByPk(userId)
      if (!user) {
        res.status(404).json({ error: 'Unknown user' })
        return
      }
      const inventory = await models.Inventory.findOne({
        where: { [Op.and]: [{ userId: userId }, { ingredientId: ingredientId }] }
      })

      await inventory.destroy()
      res.status(200).json({ message: 'Ingredient deleted from inventory' })
    } catch (err) {
      res.status(500).send({ error: err })
    }
  }
}
