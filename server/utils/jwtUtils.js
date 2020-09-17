const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken: (req, res, next) => {
    const providedToken = req.cookie.access_token
    if (!providedToken) {
      res.status(403).send('JWT is missing')
    } else {
      jwt.verify(
        providedToken,
        process.env.JWT_SECRET_KEY,
        { algorithms: ['HS256'], issuer: 'batch-cooker' },
        (err, decoded) => {
          if (err) {
            res.status(403).send('Invalid JWT')
          } else {
            next()
          }
        }
      )
    }
  }
}
