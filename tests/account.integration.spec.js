// test api/account routes

const request = require('supertest')
const app = require('../server/app')

describe('ACCOUNT', () => {
  let token = null
  let userIdToDelete = null
  beforeAll(() => {
    return request(app)
      .post('/api/account/login')
      .send({
        email: 'yligotmi@msn.com',
        password: 'pouetpouet'
      })
      .then(res => {
        const cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0])
        token = cookies.join(';').split('=')[1]
      })
  })
  afterAll(() => {
    request(app)
      .get('/api/users/')
      .set('cookie', [`access_token=${token}`])
      .then(res => {
        const lastId = res.length - 1
        userIdToDelete = res[lastId].id
        console.log('id : ' + userIdToDelete)
        request(app)
          .delete(`/api/users/${userIdToDelete}`)
          .set('cookie', [`access_token=${token}`])
      })
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
        password: 'pouetpouet'
      })
      .expect(200)
      .expect('set-cookie', /access_token=/)
      .expect('Content-Type', /json/)
      .then(res => {
        const expected = { message: 'Login succeeded' }
        expect(res.body).toEqual(expected)
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
  // it('REGISTER - SUCCESS : create account', () => {
  //   const newUser = {
  //     email: 'pierremoulin@hotmail.com',
  //     password: 'pouetpouet',
  //     username: 'ArchStanton'
  //   }
  //   return request(app)
  //     .post('/api/account/register')
  //     .send(newUser)
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .then(res => {
  //       expect(res.body).toHaveProperty('id')
  //       expect(res.body).toHaveProperty('email')
  //       expect(res.body).toHaveProperty('username')
  //       expect(res.body).toHaveProperty('isAdmin')
  //     })
  // })
})
