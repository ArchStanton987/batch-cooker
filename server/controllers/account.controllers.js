const models = require('../models')
// const validator = require('validator')
// const bcrypt = require('bcrypt')

module.exports = {
  register: (req, res) => {
    const { email, username, password } = req.body
    models.User.create({ email: email, username: username, password: password })
  }
}
