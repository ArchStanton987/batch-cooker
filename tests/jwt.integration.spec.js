// test jwt

const request = require('supertest')
const app = require('../server/app')

describe('JWT', () => {
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
  it('REFUSE ACCESS : NO TOKEN PROVIDED', () => {
    return (
      request(app)
        .get('/api/users/')
        .expect(403)
        .expect('Content-Type', /json/)
        .then(res => {
          const expected = { error: 'JWT is missing' }
          expect(res.body).toEqual(expected)
        })
    )
  })
  it('REFUSE ACCES : INVALID TOKEN', () => {
    return request(app)
      .get('/api/users/')
      .set('cookie', [`access_token=n0t4vAL1dt0k3n`])
      .expect(403)
      .expect('Content-Type', /json/)
      .then(res => {
        const expected = { error: 'Invalid JWT' }
        expect(res.body).toEqual(expected)
      })
  })
  it('GRANT ACCESS : VALID TOKEN', () => {
    return request(app)
      .get('/api/users/')
      .set('cookie', [`access_token=${token}`])
      .expect(200)
      .expect('Content-Type', /json/)
  })
})
