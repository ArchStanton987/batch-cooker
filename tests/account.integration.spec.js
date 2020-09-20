// test api/account routes

const request = require('supertest')
const app = require('../server/app')
const models = require('../server/models')

describe('ACCOUNT', () => {
  afterAll(async () => {
    const userToDelete = await models.User.findOne({ where: { email: 'lauremipsoum@msn.com' } })
    await userToDelete.destroy()
  })
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
        expect(res.body).toEqual({ error: 'Wrong email or password' })
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
        expect(res.body).toEqual({ error: 'Wrong email or password' })
      })
  })
  it('LOGIN - SUCCESS', () => {
    return request(app)
      .post('/api/account/login')
      .send({
        email: 'yligotmi@msn.com',
        password: 'pouetpouet'
      })
      .expect(200)
      .expect('set-cookie', /access_token=/)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toEqual({ message: 'Login succeeded' })
      })
  })
  it('REGISTER - FAILURE : existing email', () => {
    return request(app)
      .post('/api/account/register')
      .send({
        email: 'yligotmi@msn.com',
        password: 'choucroute',
        username: 'youriligotmi'
      })
      .expect(400)
      .then(res => {
        expect(res.body).toEqual({ error: 'Email already existing' })
      })
  })
  it('REGISTER - FAILURE : existing username', () => {
    return request(app)
      .post('/api/account/register')
      .send({
        email: 'helloworld@msn.com',
        password: 'choucroute',
        username: 'yligotmi'
      })
      .expect(400)
      .then(res => {
        expect(res.body).toEqual({ error: 'Username already existing' })
      })
  })
  it('REGISTER - SUCCESS : create account', () => {
    const newUser = {
      email: 'lauremipsoum@msn.com',
      password: 'pouetpouet',
      username: 'lemipsoum'
    }
    return request(app)
      .post('/api/account/register')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('email', 'lauremipsoum@msn.com')
        expect(res.body).toHaveProperty('username', 'lemipsoum')
        expect(res.body).toHaveProperty('isAdmin')
      })
  })
})
