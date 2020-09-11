// index.js
const app = require('./server');

const port = process.env.SERVER_PORT;

app.listen(3000, (err) => {
  if (err) {
    throw new Error(`An error occurred: ${err.message}`);
  }
  console.log(`Server is listening on ${port}`);
});