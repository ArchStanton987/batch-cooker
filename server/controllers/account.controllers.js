const models = require('../models')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    const { email, username, password } = req.body
    const existingUser = await models.User.findOne({ where: { email: email } })
    if (existingUser) {
      res.status(400).json({ error: 'Email already existing' })
      return
    }
    if (!validator.isLength(username, { min: 5, max: 20 })) {
      res.status(400).json({ error: 'Username must contain between 5 and 20 characters' })
      return
    }
    if (!validator.isEmail(email)) {
      res.status(400).json({ error: 'Email format not valid' })
      return
    }
    try {
      const newUser = await models.User.create({
        email: email,
        username: username,
        password: password
      })
      res.status(200).json({ newUser })
    } catch (err) {
      res.status(400).json({ error: err })
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body
    const user = await models.User.findOne({ where: { email: email } })
    if (!user) {
      res.status(400).json({ error: 'user not found' })
    } else {
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        res.status(403).json({ error: 'wrong password or username' })
      } else {
        jwt.sign(
          { sub: user.id, iss: 'batch-cooker', scopes: ['admin', 'user'] },
          process.env.JWT_SECRET_KEY,
          { algorithm: 'HS256', expiresIn: '1h' },
          (err, token) => {
            if (err) {
              console.log(err)
              res.status(500).send({ message: 'Error signing token' })
            }
            res.cookie('access_token', token, { httpOnly: true, sameSite: true })
            res.status(200).send({ message: 'Login suceeded' })
          }
        )
      }
    }
  }
}
