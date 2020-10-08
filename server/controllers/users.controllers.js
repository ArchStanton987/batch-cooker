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
    const userId = req.params.id
    const { email, username, password } = req.body
    let user = await models.User.findByPk(userId)

    // Checks for existing username
    if (user.username !== username) {
      const existingUsername = await models.User.findOne({
        where: {
          username: username
        }
      })
      if (existingUsername) {
        res.status(400).json({ error: 'Username already existing' })
        return
      }
    }

    // Checks for existing email
    if (user.email !== email) {
      const existingEmail = await models.User.findOne({
        where: {
          email: email
        }
      })
      if (existingEmail) {
        res.status(400).json({ error: 'Email already existing' })
        return
      }
    }

    // Assign new values
    user.email = email
    user.username = username
    user.password = password

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
