const path = require('path')
require('dotenv').config({ path: path.resolve('../', '.env') })
const app = require('./app')

app.listen(process.env.SERVER_PORT, err => {
  if (err) {
    throw new Error('Something bad happened...')
  }
  console.log(`Server is listening on ${process.env.SERVER_PORT}`)
})
