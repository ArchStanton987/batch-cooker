const path = require('path')
require('dotenv').config({ path: path.resolve('../', '.env') })
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const users = require('./routes/users')
const account = require('./routes/account')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

app.use('/api/users', users)
app.use('/api/account', account)

app.listen(process.env.SERVER_PORT, err => {
  if (err) {
    throw new Error('Something bad happened...')
  }
  console.log(`Server is listening on ${process.env.SERVER_PORT}`)
})

module.exports = app
