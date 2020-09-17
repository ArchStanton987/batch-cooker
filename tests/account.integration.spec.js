// test api/account routes

const request = require('supertest')
const app = require('../server/app')

describe('account routes', () => {
  it('LOGIN - FAILURE : UNKNOWN EMAIL', async done => {
    await request(app)
      .post('/api/account/login')
      .send({
        email: 'wrongemail@wronghost.com',
        password: 'password'
      })
      .expect(401)
      .expect('Content-Type', /json/)
      .then(res => {
        const expected = { error: 'Wrong email or password' }
        expect(res.body).toEqual(expected)
      })
    done()
  })
})
