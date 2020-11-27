const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const users = require('./routes/users')
const account = require('./routes/account')
const inventory = require('./routes/inventory')
const shoppinglist = require('./routes/shoppinglist')
const recipes = require('./routes/recipes')

const app = express()

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://192.168.1.27:3000', 'https://batch-cooker.herokuapp.com/'],
    optionsSuccessStatus: 200
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/users', users)
app.use('/api/account', account)
app.use('/api/inventory', inventory)
app.use('/api/recipes', recipes)
app.use('/api/shoppinglist', shoppinglist)

module.exports = app
