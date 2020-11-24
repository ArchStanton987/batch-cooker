const models = require('../models')
const { Op } = require('sequelize')
const ingredientsUtils = require('../utils/ingredientsUtils')

module.exports = {
  getUserInventory: async (req, res) => {
    const userId = parseInt(req.params.userId, 10)
    if (userId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }
    try {
      const user = await models.User.findByPk(userId)
      if (!user) {
        res.status(404).json({ error: 'Utilisateur inconnu' })
        return
      } else {
        const inventory = await models.Inventory.findAll({
          where: { userId: userId },
          attributes: ['quantity', 'ingredientId', 'unit'],
          include: [{ model: models.Ingredient, attributes: ['name', 'category'] }]
        })
        res.status(200).json(inventory)
      }
    } catch (err) {
      res.status(500).json({ error: `Erreur en récupérant l'inventaire ; ${err}` })
    }
  },

  addToInventory: async (req, res) => {
    let { ingredientName, category, quantity, unit } = req.body
    let { userId } = req.params
    let newIngredient = { name: ingredientName.toLowerCase(), category: category }

    if (parseInt(userId, 10) !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    const user = await models.User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'Utilisateur inconnu' })
      return
    }

    let newInvItem = {
      userId: parseInt(userId, 10),
      quantity: parseInt(quantity, 10) || 0,
      unit: unit.trim().toLowerCase() || ''
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
          fields: ['userId', 'ingredientId', 'quantity', 'unit']
        })
        res.status(201).json(newInvItem)
      }
      if (ingredientInInventory) {
        let invQty = ingredientInInventory.quantity
        let invUnit = ingredientInInventory.unit.trim().toLowerCase() || ''
        let invUnitType = ingredientsUtils.getUnitType(invUnit)

        let newInvUnitType = ingredientsUtils.getUnitType(newInvItem.unit)

        if (
          newInvUnitType === invUnitType &&
          invUnit !== newInvItem.unit &&
          invUnitType !== 'autres'
        ) {
          let convNewInv = ingredientsUtils.convertToCommonUnit(
            newInvItem.quantity,
            newInvItem.unit,
            newInvUnitType
          )
          let convInvIng = ingredientsUtils.convertToCommonUnit(invQty, invUnit, invUnitType)
          ingredientInInventory.quantity = convInvIng.quantity + convNewInv.quantity
          ingredientInInventory.unit = convInvIng.unit
        } else {
          ingredientInInventory.quantity =
            parseInt(ingredientInInventory.quantity, 10) + newInvItem.quantity
        }
        await ingredientInInventory.save()
        res.status(201).json(ingredientInInventory)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },

  updateFromInventory: async (req, res) => {
    const userId = req.params.userId
    const ingredientId = req.params.ingredientId
    const quantity = parseInt(req.body.quantity, 10)
    const { unit } = req.body

    if (parseInt(userId, 10) !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      const user = await models.User.findByPk(userId)
      if (!user) {
        res.status(404).json({ error: 'Utilisateur inconnu' })
        return
      }
      const inventory = await models.Inventory.findOne({
        where: { [Op.and]: [{ userId: userId }, { ingredientId: ingredientId }] }
      })
      inventory.quantity = quantity
      inventory.unit = unit
      await inventory.save()
      res.status(200).json(inventory)
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },
  deleteFromInventory: async (req, res) => {
    const userId = req.params.userId
    const ingredientId = req.params.ingredientId

    if (parseInt(userId, 10) !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      const user = await models.User.findByPk(userId)
      if (!user) {
        res.status(404).json({ error: 'Utilisateur inconnu' })
        return
      }
      const inventory = await models.Inventory.findOne({
        where: { [Op.and]: [{ userId: userId }, { ingredientId: ingredientId }] }
      })

      await inventory.destroy()
      res.status(200).json({ message: "Ingrédient supprimé de l'inventaire" })
    } catch (err) {
      res.status(500).send({ error: err })
    }
  }
}
