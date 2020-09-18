const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  verifyToken: (req, res, next) => {
    const providedToken = req.cookies.access_token || false
    if (!providedToken) {
      res.status(403).json({ error: 'JWT is missing' })
    } else {
      jwt.verify(
        providedToken,
        process.env.JWT_SECRET_KEY,
        { algorithms: ['HS256'], issuer: 'batch-cooker' },
        (err, decoded) => {
          if (err) {
            res.status(403).json({ error: 'Invalid JWT' })
          } else {
            next()
          }
        }
      )
    }
  }
}
