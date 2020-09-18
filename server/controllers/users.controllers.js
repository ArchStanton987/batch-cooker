const models = require('../models')

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await models.User.findAll({ attributes: ['id', 'username', 'email'] })
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  getOneUserById: async (req, res) => {
    const userId = req.params.id
    try {
      const user = await models.User.findByPk(userId, { attributes: ['id', 'username', 'email'] })
      if (!user) {
        res.status(404).json({ error: 'Unknown user' })
      } else {
        res.status(200).json(user)
      }
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  updateOneUser: async (req, res) => {
    const userId = req.body.id
    const newUserAttributes = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
    try {
      const user = await models.User.findByPk(userId)
      for (let attribute in newUserAttributes) {
        newUserAttributes[attribute] !== user[attribute] &&
          (user[attribute] = newUserAttributes[attribute])
      }
      await user.save({ fields: ['email', 'username', 'password'] })
    } catch (err) {
      res.status(500).send(err)
    }
  },
  deleteOneUser: async (req, res) => {
    const userId = req.body.id
    try {
      await models.User.destroy({
        where: {
          id: userId
        }
      })
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
