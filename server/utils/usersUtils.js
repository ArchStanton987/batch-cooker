const models = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
  getUserById: async userId => {
    const user = await models.User.findByPk(parseInt(userId, 10))
    return user
  },
  addUserIdToReq: (req, res, next) => {
    const providedToken = req.cookies.access_token || false
    if (!providedToken) {
      req.isUserIdentified = false
    } else {
      let decoded = jwt.decode(providedToken)
      req.isUserIdentified = true
      req.subId = decoded.sub
    }
    next()
  }
}
