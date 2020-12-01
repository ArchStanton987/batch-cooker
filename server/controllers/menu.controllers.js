const models = require('../models')

module.exports = {
  getUserMenu: async (req, res) => {
    const UserId = parseInt(req.params.UserId, 10)

    if (UserId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      const menu = await models.Menu.findAll({
        where: {
          UserId: UserId
        },
        include: [
          {
            model: models.Recipe,
            attributes: ['id', 'name', 'image'],
            include: [
              { model: models.Tag, attributes: ['id', 'tagname'], through: { attributes: [] } }
            ]
          }
        ]
      })
      res.status(200).json(menu)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  putRecipeMenu: async (req, res) => {
    const UserId = parseInt(req.params.UserId, 10)
    const RecipeId = parseInt(req.params.RecipeId, 10)

    if (UserId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      const existingMenu = await models.Menu.findOne({
        where: { UserId: UserId, RecipeId: RecipeId }
      })
      if (existingMenu) {
        try {
          await existingMenu.destroy()
          res.status(200).json({ message: 'Recette supprimée de votre menu' })
        } catch (err) {
          res
            .status(500)
            .json({ error: 'Erreur pendant la suppression de la recette de votre menu ; ' + err })
        }
      } else {
        try {
          await models.Menu.create({ UserId: UserId, RecipeId: RecipeId })
          res.status(201).json({ message: 'Recette enregistée dans votre menu' })
        } catch (err) {
          res
            .status(500)
            .json({ error: "Erreur pendant l'enregistrement de la recette dans votre menu" })
        }
      }
    } catch (err) {
      res.status(500).json({ error: "L'action n'a pas pu être réalisée" })
    }
  },
  clearUserMenu: async (req, res) => {
    const UserId = parseInt(req.params.UserId, 10)

    if (UserId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      await models.Menu.destroy({ where: { UserId: UserId } })
      res.status(200).json({ message: 'Les recettes ont bien été supprimées de votre menu' })
    } catch (err) {
      res.status(500).json({ error: 'Erreur pendant la suppression du menu' })
    }
  },
  getAllIngredientsFromMenu: async (req, res) => {
    const UserId = parseInt(req.params.UserId, 10)

    if (UserId !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    try {
      let menuIngredients = await models.Menu.findAll({
        where: { UserId: UserId },
        include: { model: models.Recipe, include: { model: models.RecipeIng } }
      })
      res.status(200).json(menuIngredients)
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération des ingrédients du menu ; ' + err })
    }
  }
}
