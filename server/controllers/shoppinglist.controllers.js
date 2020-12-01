const models = require('../models')
const { Op } = require('sequelize')

module.exports = {
  getUserShoppingList: async (req, res) => {
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
        const shoppingList = await models.ShoppingList.findAll({
          where: { UserId: UserId },
          attributes: ['quantity', 'IngredientId', 'unit'],
          include: [{ model: models.Ingredient, attributes: ['name', 'category'] }]
        })
        res.status(200).json(shoppingList)
      }
    } catch (err) {
      res.status(500).json({ error: `Erreur en récupérant la liste de courses ; ${err}` })
    }
  },
  clearUserShoppingList: async (req, res) => {
    const UserId = parseInt(req.params.UserId, 10)
    if (UserId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }
    try {
      await models.ShoppingList.destroy({ where: { UserId: UserId } })
      res.status(200).json({ message: 'La liste de course a été vidée' })
    } catch (err) {
      res.status(500).json({ error: 'Erreur en vidant la liste de course ; ' + err })
    }
  },
  addIngredientToShoppingList: async (req, res) => {
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

    let newListItem = {
      UserId: parseInt(UserId, 10),
      quantity: parseInt(quantity, 10) || 0,
      unit: unit
    }

    const ingredientExists = await models.Ingredient.findOne({
      where: { name: ingredientName, category: category }
    })
    if (!ingredientExists) {
      let createdIngredient = await models.Ingredient.create(newIngredient)
      newListItem.IngredientId = createdIngredient.id
    }
    if (ingredientExists) {
      newListItem.IngredientId = ingredientExists.id
    }

    let ingredientInList = await models.ShoppingList.findOne({
      where: { [Op.and]: [{ UserId: UserId }, { IngredientId: newListItem.IngredientId }] }
    })

    try {
      if (!ingredientInList) {
        await models.ShoppingList.create(newListItem, {
          fields: ['UserId', 'IngredientId', 'quantity', 'unit']
        })
        res.status(201).json(newListItem)
      }
      if (ingredientInList) {
        ingredientInList.quantity = parseInt(ingredientInList.quantity, 10) + newListItem.quantity
        await ingredientInList.save()
        res.status(201).json(ingredientInList)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },
  updateIngredientFromShoppingList: async (req, res) => {
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
      const shoppingList = await models.ShoppingList.findOne({
        where: { [Op.and]: [{ UserId: UserId }, { IngredientId: IngredientId }] }
      })
      shoppingList.quantity = quantity
      shoppingList.unit = unit
      await shoppingList.save()
      res.status(200).json(shoppingList)
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },
  deleteIngredientFromShoppingList: async (req, res) => {
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
      const ingredient = await models.ShoppingList.findOne({
        where: { [Op.and]: [{ UserId: UserId }, { IngredientId: IngredientId }] }
      })

      await ingredient.destroy()
      res.status(200).json({ message: 'Ingrédient supprimé de la liste de course' })
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },
  addMenuIngredientsToShoppinglist: async (req, res) => {
    const { UserId } = req.params
    let ingredients = req.body
    
    if (parseInt(UserId, 10) !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      await models.ShoppingList.destroy({ where: { UserId: UserId } })

      await models.ShoppingList.bulkCreate(ingredients, {
        fields: ['UserId', 'IngredientId', 'quantity', 'unit']
      })
      res.status(200).json({ message: 'La liste de course a bien été mise à jour' })
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Erreur pendant la mise à jour de la liste de course ; ' + err })
    }
  }
}
