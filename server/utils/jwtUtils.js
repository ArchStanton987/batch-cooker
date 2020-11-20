const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  verifyToken: (req, res, next) => {
    const providedToken = req.cookies.access_token || false
    if (!providedToken) {
      res.status(403).json({ error: "Vous n'êtes pas identifié" })
    } else {
      jwt.verify(
        providedToken,
        process.env.JWT_SECRET_KEY,
        { algorithms: ['HS256'], issuer: 'batch-cooker' },
        (err, decoded) => {
          if (err) {
            res.status(403).json({ error: 'Votre session a expirée, merci de vous reconnecter' })
          } else {
            req.tokenUser = decoded.sub
            next()
          }
        }
      )
    }
  },
  checkExpired: (req, res, next) => {
    const providedToken = req.cookies.access_token || false
    if (!providedToken) {
      res.status(403).json({ error: "Vous n'êtes pas identifié" })
    }
    jwt.verify(
      providedToken,
      process.env.JWT_SECRET_KEY,
      { algorithms: ['HS256'], issuer: 'batch-cooker', ignoreExpiration: true },
      (err, decoded) => {
        if (err) {
          res.status(403).json({ error: 'Votre session est invalide' })
        } else {
          req.tokenUser = decoded.sub
          next()
        }
      }
    )
  }
}
