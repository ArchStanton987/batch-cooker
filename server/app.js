const express = require('express')
const path = require('path')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const users = require('./routes/users')
const account = require('./routes/account')
const inventory = require('./routes/inventory')
const shoppinglist = require('./routes/shoppinglist')
const recipes = require('./routes/recipes')

const isDev = process.env.NODE_ENV !== 'production'

if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    )
  })
} else {
  const app = express()

  app.use(express.static(path.resolve(__dirname, '../build')))

  app.use(
    cors({
      credentials: true,
      origin: [
        'http://localhost:3000',
        'http://192.168.1.27:3000',
        'http://localhost:8000',
        'http://192.168.1.27:8000',
        'https://batch-cooker.herokuapp.com/*'
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

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
  })

  module.exports = app
}
