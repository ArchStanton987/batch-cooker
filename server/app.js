const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression');
const users = require('./routes/users')
const account = require('./routes/account')
const inventory = require('./routes/inventory')
const shoppinglist = require('./routes/shoppinglist')
const recipes = require('./routes/recipes')

const env = process.env.NODE_ENV

const app = express()

app.use(compression())

if (env === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')))
}

app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://192.168.1.27:3000',
      'http://localhost:8000',
      'http://192.168.1.27:8000',
      'http://localhost:8001',
      'http://192.168.1.27:8001',
      'https://batch-cooker.herokuapp.com/'
    ],
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

if (env === 'production') {
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
  })
}

module.exports = app
