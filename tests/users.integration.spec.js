// test api/users routes

const request = require('supertest')
const app = require('../server/app')

describe('USERS', () => {
  let token = null
  beforeAll(() => {
    return request(app)
      .post('/api/account/login')
      .send({
        email: 'yligotmi@msn.com',
        password: 'pouet'
      })
      .then(res => {
        const cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0])
        token = cookies.join(';').split('=')[1]
      })
  })
  it('getAllUsers - SUCCESS : id, email, username)', () => {
    return request(app)
      .get('/api/users/')
      .set('cookie', [`access_token=${token}`])
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const results = res.body
        let randomNumber = Math.floor(Math.random() * (results.length - 1))
        expect(results.length).toBeGreaterThan(1)
        expect(results[randomNumber]).toHaveProperty('id')
        expect(results[randomNumber]).toHaveProperty('email')
        expect(results[randomNumber]).toHaveProperty('username')
      })
  })
  it('getOneUserById - FAILURE : non-existing id', () => {
    return request(app)
      .get('/api/users/987')
      .set('cookie', [`access_token=${token}`])
      .expect(404)
      .expect('Content-Type', /json/)
      .then(res => {
        const expected = { error: 'Unknown user' }
        expect(res.body).toEqual(expected)
      })
  })
  it('getOneUserById - SUCCESS : id, email, username', () => {
    return request(app)
      .get('/api/users/2')
      .set('cookie', [`access_token=${token}`])
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const result = res.body
        expect(result).toHaveProperty('id', 2)
        expect(result).toHaveProperty('email', 'azeblouse@msn.com')
        expect(result).toHaveProperty('username', 'azeblouse')
      })
  })
})
