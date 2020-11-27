const path = require('path')
require('dotenv').config({ path: path.resolve('../', '.env') })
const app = require('./app')

const port = process.env.SERVER_PORT || 8000

app.listen(port, err => {
  if (err) {
    throw new Error('Something bad happened...')
  }
  console.log(`Server is listening on ${port}`)
})
