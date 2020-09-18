// test api/account routes

const request = require('supertest')
const app = require('../server/app')

describe('account routes', () => {
  it('LOGIN - FAILURE : Unknown email', () => {
    return request(app)
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
  })
  it('LOGIN - FAILURE : Wrong password', () => {
    return request(app)
      .post('/api/account/login')
      .send({
        email: 'yligotmi@msn.com',
        password: 'password'
      })
      .expect(401)
      .expect('Content-Type', /json/)
      .then(res => {
        const expected = { error: 'Wrong email or password' }
        expect(res.body).toEqual(expected)
      })
  })
  it('LOGIN - SUCCESS', () => {
    return request(app)
      .post('/api/account/login')
      .send({
        email: 'yligotmi@msn.com',
        password: 'pouet'
      })
      .expect(200)
      .expect('set-cookie', /access_token=/)
      .expect('Content-Type', /json/)
      .then(res => {
        const expected = { message: 'Login succeeded' }
        expect(res.body).toEqual(expected)
      })
  })
})
