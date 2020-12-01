const models = require('../models')
const { Op } = require('sequelize')
const ingredientsUtils = require('../utils/ingredientsUtils')

module.exports = {
  getUserInventory: async (req, res) => {
    const UserId = parseInt(req.params.UserId, 10)
    if (UserId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }
    try {
      const user = await models.User.findByPk(UserId)
      if (!user) {
        res.status(404).json({ error: 'Utilisateur inconnu' })
        return
      } else {
        const inventory = await models.Inventory.findAll({
          where: { UserId: UserId },
          attributes: ['quantity', 'IngredientId', 'unit'],
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
    let { UserId } = req.params
    let newIngredient = { name: ingredientName.toLowerCase(), category: category }

    if (parseInt(UserId, 10) !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    const user = await models.User.findByPk(UserId)
    if (!user) {
      res.status(404).json({ error: 'Utilisateur inconnu' })
      return
    }

    let newInvItem = {
      UserId: parseInt(UserId, 10),
      quantity: parseInt(quantity, 10) || 0,
      unit: unit.trim().toLowerCase() || ''
    }

    const ingredientExists = await models.Ingredient.findOne({
      where: { name: ingredientName, category: category }
    })
    if (!ingredientExists) {
      let createdIngredient = await models.Ingredient.create(newIngredient)
      newInvItem.IngredientId = createdIngredient.id
    }
    if (ingredientExists) {
      newInvItem.IngredientId = ingredientExists.id
    }

    let ingredientInInventory = await models.Inventory.findOne({
      where: { [Op.and]: [{ UserId: UserId }, { IngredientId: newInvItem.IngredientId }] }
    })
    try {
      if (!ingredientInInventory) {
        await models.Inventory.create(newInvItem, {
          fields: ['UserId', 'IngredientId', 'quantity', 'unit']
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
    const UserId = req.params.UserId
    const IngredientId = req.params.IngredientId
    const quantity = parseInt(req.body.quantity, 10)
    const { unit } = req.body

    if (parseInt(UserId, 10) !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      const user = await models.User.findByPk(UserId)
      if (!user) {
        res.status(404).json({ error: 'Utilisateur inconnu' })
        return
      }
      const inventory = await models.Inventory.findOne({
        where: { [Op.and]: [{ UserId: UserId }, { IngredientId: IngredientId }] }
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
    const UserId = req.params.UserId
    const IngredientId = req.params.IngredientId

    if (parseInt(UserId, 10) !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      const user = await models.User.findByPk(UserId)
      if (!user) {
        res.status(404).json({ error: 'Utilisateur inconnu' })
        return
      }
      const inventory = await models.Inventory.findOne({
        where: { [Op.and]: [{ UserId: UserId }, { IngredientId: IngredientId }] }
      })

      await inventory.destroy()
      res.status(200).json({ message: "Ingrédient supprimé de l'inventaire" })
    } catch (err) {
      res.status(500).send({ error: err })
    }
  }
}
