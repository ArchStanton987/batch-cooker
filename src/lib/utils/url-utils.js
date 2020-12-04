const api = process.env.REACT_APP_API

let apiUrl
api === 'REMOTE'
  ? (apiUrl = process.env.REACT_APP_API_URL)
  : (apiUrl = process.env.REACT_APP_LOCAL_API_URL)

module.exports = { apiUrl }
