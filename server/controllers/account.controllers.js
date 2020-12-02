const models = require('../models')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    const { email, username, password } = req.body
    const existingEmail = await models.User.findOne({ where: { email: email } })
    if (existingEmail) {
      res.status(400).json({ error: 'Cet email existe déjà' })
      return
    }
    const existingUsername = await models.User.findOne({ where: { username: username } })
    if (existingUsername) {
      res.status(400).json({ error: 'Ce nom existe déjà' })
      return
    }
    if (!validator.isLength(username, { min: 4, max: 20 })) {
      res.status(400).json({ error: 'Le nom doit contenir entre 4 et 20 caractères' })
      return
    }
    if (!validator.isEmail(email)) {
      res.status(400).json({ error: "Format de l'email invalide" })
      return
    }
    try {
      const newUser = await models.User.create(
        {
          email: email,
          username: username,
          password: password
        },
        { fields: ['email', 'username', 'password'] }
      )
      res.status(201).json(newUser)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body

    const user = await models.User.findOne({ where: { email: email } })
    if (!user) {
      res.status(401).json({ error: 'Email ou mot de passe invalide' })
    } else {
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        res.status(401).json({ error: 'Email ou mot de passe invalide' })
      } else {
        jwt.sign(
          { sub: user.id, iss: 'batch-cooker', scopes: ['admin', 'user'] },
          process.env.JWT_SECRET_KEY,
          { algorithm: 'HS256', expiresIn: '2h' },
          (err, token) => {
            if (err) {
              res.status(500).json({ error: err })
            }
            res.cookie('access_token', token, {
              httpOnly: true,
              sameSite: 'Strict'
            })
            res
              .status(200)
              .json({ message: 'Identification réussie', UserId: user.id, username: user.username })
          }
        )
      }
    }
  },
  logout: async (req, res) => {
    const UserId = parseInt(req.body.UserId, 10)

    if (parseInt(UserId, 10) !== req.tokenUser) {
      res.status(403).json({ error: 'Action interdite' })
      return
    }

    res.cookie('access_token', '', {
      httpOnly: true,
      sameSite: 'none'
    })
    res.status(200).json({ message: 'Déconnexion réussie' })
  }
}
