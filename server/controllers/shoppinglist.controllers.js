const models = require('../models')
const { Op } = require('sequelize')

module.exports = {
  getUserShoppingList: async (req, res) => {
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
        const shoppingList = await models.ShoppingList.findAll({
          where: { userId: userId },
          attributes: ['quantity', 'ingredientId', 'unity'],
          include: [{ model: models.Ingredient, attributes: ['name', 'category'] }]
        })
        res.status(200).json(shoppingList)
      }
    } catch (err) {
      res.status(500).json({ error: `Erreur en récupérant la liste de courses ; ${err}` })
    }
  },
  clearUserShoppingList: async (req, res) => {
    const userId = parseInt(req.params.userId, 10)
    if (userId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }
    try {
      await models.ShoppingList.destroy({ where: { userId: userId } })
      res.status(200).json({ message: 'La liste de course a été vidée' })
    } catch (err) {
      res.status(500).json({ error: 'Erreur en vidant la liste de course ; ' + err })
    }
  },
  addIngredientToShoppingList: async (req, res) => {
    let { ingredientName, category, quantity, unity } = req.body
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

    let newListItem = {
      userId: parseInt(userId, 10),
      quantity: parseInt(quantity, 10) || 0,
      unity: unity
    }

    const ingredientExists = await models.Ingredient.findOne({
      where: { name: ingredientName, category: category }
    })
    if (!ingredientExists) {
      let createdIngredient = await models.Ingredient.create(newIngredient)
      newListItem.ingredientId = createdIngredient.id
    }
    if (ingredientExists) {
      newListItem.ingredientId = ingredientExists.id
    }

    let ingredientInList = await models.ShoppingList.findOne({
      where: { [Op.and]: [{ userId: userId }, { ingredientId: newListItem.ingredientId }] }
    })

    try {
      if (!ingredientInList) {
        await models.ShoppingList.create(newListItem, {
          fields: ['userId', 'ingredientId', 'quantity', 'unity']
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
    const userId = req.params.userId
    const ingredientId = req.params.ingredientId
    const quantity = parseInt(req.body.quantity, 10)
    const { unity } = req.body

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
      const shoppingList = await models.ShoppingList.findOne({
        where: { [Op.and]: [{ userId: userId }, { ingredientId: ingredientId }] }
      })
      shoppingList.quantity = quantity
      shoppingList.unity = unity
      await shoppingList.save()
      res.status(200).json(shoppingList)
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },
  deleteIngredientFromShoppingList: async (req, res) => {
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
      const ingredient = await models.ShoppingList.findOne({
        where: { [Op.and]: [{ userId: userId }, { ingredientId: ingredientId }] }
      })

      await ingredient.destroy()
      res.status(200).json({ message: "Ingrédient supprimé de la liste de course" })
    } catch (err) {
      res.status(500).send({ error: err })
    }
  }
}
