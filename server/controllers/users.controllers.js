const models = require('../models')
const { Op } = require('sequelize')

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
    const userId = req.params.id
    const newUserAttributes = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
    let user = await models.User.findByPk(userId)

    // Checks for existing email
    const existingEmail = await models.User.findOne({
      where: {
        [Op.and]: [{ email: { [Op.not]: user.email } }, { email: newUserAttributes.email }]
      }
    })
    if (existingEmail) {
      res.status(400).json({ error: 'Email already existing' })
      return
    }

    // Checks for existing username
    const existingUsername = await models.User.findOne({
      where: {
        [Op.and]: [
          { username: { [Op.not]: user.username } },
          { username: newUserAttributes.username }
        ]
      }
    })
    if (existingUsername) {
      res.status(400).json({ error: 'Username already existing' })
      return
    }

    // Assign new values
    user.email = newUserAttributes.email
    user.username = newUserAttributes.username
    user.password = newUserAttributes.password

    try {
      await user.save()
      res.status(200).send(user)
    } catch (err) {
      res.status(500).send(err)
    }
  },
  deleteOneUser: async (req, res) => {
    const userId = req.params.id
    const user = await models.User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'Unknown user' })
      return
    }
    try {
      await user.destroy()
      res.status(200).json({ message: 'User deleted' })
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
