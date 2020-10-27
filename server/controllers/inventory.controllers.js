const models = require('../models')
const { Op } = require('sequelize')

module.exports = {
  getUserInventory: async (req, res) => {
    const userId = parseInt(req.params.userId, 10)    
    if (userId !== req.tokenUser) {
      res.status(401).json({ error: 'Forbidden' })
      return
    }
    try {
      const user = await models.User.findByPk(userId)
      if (!user) {
        res.status(404).json({ error: 'Unknown user' })
        return
      } else {
        const inventory = await models.Inventory.findAll({
          where: { userId: userId },
          attributes: ['quantity', 'ingredientId', 'unity'],
          include: [{ model: models.Ingredient, attributes: ['name', 'category'] }]
        })
        res.status(200).json(inventory)
      }
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },

  addToInventory: async (req, res) => {
    let { ingredientName, category, quantity, unity } = req.body
    let { userId } = req.params
    let newIngredient = { name: ingredientName.toLowerCase(), category: category }

    if (parseInt(userId,10) !== req.tokenUser) {
      res.status(401).json({ error: 'Forbidden' })
      return
    }

    const user = await models.User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'Unknown user' })
      return
    }

    let newInvItem = {
      userId: parseInt(userId, 10),
      quantity: parseInt(quantity, 10) || 0,
      unity: unity
    }

    const ingredientExists = await models.Ingredient.findOne({
      where: { name: ingredientName, category: category }
    })
    if (!ingredientExists) {
      let createdIngredient = await models.Ingredient.create(newIngredient)
      newInvItem.ingredientId = createdIngredient.id
    }
    if (ingredientExists) {
      newInvItem.ingredientId = ingredientExists.id
    }

    let ingredientInInventory = await models.Inventory.findOne({
      where: { [Op.and]: [{ userId: userId }, { ingredientId: newInvItem.ingredientId }] }
    })
    try {
      if (!ingredientInInventory) {
        await models.Inventory.create(newInvItem, {
          fields: ['userId', 'ingredientId', 'quantity', 'unity']
        })
        res.status(200).json(newInvItem)
      }
      if (ingredientInInventory) {
        ingredientInInventory.quantity =
          parseInt(ingredientInInventory.quantity, 10) + newInvItem.quantity
        await ingredientInInventory.save()
        res.status(200).json(ingredientInInventory)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },

  updateFromInventory: async (req, res) => {
    const userId = req.params.userId    
    const ingredientId = req.params.ingredientId
    const quantity = parseInt(req.body.quantity, 10)
    const { unity } = req.body

    if (parseInt(userId,10) !== req.tokenUser) {
      res.status(401).json({ error: 'Forbidden' })
      return
    }

    try {
      const user = await models.User.findByPk(userId)
      if (!user) {
        res.status(404).json({ error: 'Unknown user' })
        return
      }
      const inventory = await models.Inventory.findOne({
        where: { [Op.and]: [{ userId: userId }, { ingredientId: ingredientId }] }
      })
      inventory.quantity = quantity
      inventory.unity = unity
      await inventory.save()
      res.status(200).json(inventory)
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },
  deleteFromInventory: async (req, res) => {
    const userId = req.params.userId
    const ingredientId = req.params.ingredientId

    if (parseInt(userId,10) !== req.tokenUser) {
      res.status(401).json({ error: 'Forbidden' })
      return
    }
    
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
