const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
require('dotenv').config()
const env = process.env.NODE_ENV
const api = process.env.REACT_APP_API
const config = require('../config/sequelize-config')[env]
const db = {}

const sequelize =
  api === 'REMOTE'
    ? new Sequelize(process.env.DATABASE_URL)
    : env === 'production'
    ? new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USER, process.env.DEV_DB_PASS, {
        dialect: 'mysql',
        host: process.env.DEV_DB_HOST
      })
    : new Sequelize(config.database, config.username, config.password, config)

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
