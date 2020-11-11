const models = require('../models')

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
  }
}
