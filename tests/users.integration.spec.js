// test api/users routes

const request = require('supertest')
const app = require('../server/app')
const models = require('../server/models')

describe('USERS', () => {
  let token = null
  let idToBeDeleted = null

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

  beforeAll(async () => {
    const testUser = await models.User.create({
      email: 'gerardmenvussa@msn.com',
      username: 'gmenvussa',
      password: 'choucroute'
    })
    idToBeDeleted = testUser.id
  })

  afterAll(() => {
    return request(app)
      .put('/api/users/2')
      .set('cookie', [`access_token=${token}`])
      .send({ email: 'azeblouse@msn.com', username: 'azeblouse', password: 'pouetpouet' })
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

  it('updateOneUser - FAILURE : existing username', () => {
    const newUser = {
      email: 'azeblouse@msn.com',
      username: 'yligotmi',
      password: 'pouetpouet'
    }
    return request(app)
      .put('/api/users/2')
      .set('cookie', [`access_token=${token}`])
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        const expected = { error: 'Username already existing' }
        expect(res.body).toEqual(expected)
      })
  })

  it('updateOneUser - FAILURE : existing email', () => {
    const newUser = {
      email: 'ericantonnais@msn.com',
      username: 'azeblouse',
      password: 'pouetpouet'
    }
    return request(app)
      .put('/api/users/2')
      .set('cookie', [`access_token=${token}`])
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        const expected = { error: 'Email already existing' }
        expect(res.body).toEqual(expected)
      })
  })

  it('updateOneUser - SUCCESS', () => {
    const newUser = {
      email: 'igottheblues@msn.com',
      username: 'igottheblue',
      password: 'azertyu'
    }
    return request(app)
      .put('/api/users/2')
      .set('cookie', [`access_token=${token}`])
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const result = res.body
        expect(result).toHaveProperty('id', 2)
        expect(result).toHaveProperty('email', newUser.email)
        expect(result).toHaveProperty('username', newUser.username)
        expect(result).toHaveProperty('password')
      })
  })

  it('deleteOneUser - FAILURE : non-existing id', () => {
    return request(app)
      .delete('/api/users/987')
      .set('cookie', [`access_token=${token}`])
      .expect(404)
      .expect('Content-Type', /json/)
      .then(res => {
        const expected = { error: 'Unknown user' }
        expect(res.body).toEqual(expected)
      })
  })

  it('deleteOneUser - SUCCESS', () => {
    return request(app)
      .delete(`/api/users/${idToBeDeleted}`)
      .set('cookie', [`access_token=${token}`])
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const expected = { message: 'User deleted' }
        expect(res.body).toEqual(expected)
      })
  })
})
