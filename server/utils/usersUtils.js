const models = require('../models')

module.exports = {
  getUserById: async userId => {
    const user = await models.User.findByPk(parseInt(userId, 10))
    return user
  }
}
