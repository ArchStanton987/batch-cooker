// test api/recipe routes

const request = require('supertest')
const app = require('../server/app')
const models = require('../server/models')

describe('TAGS', () => {
  let TagIdToDelete = null

  beforeAll(async () => {
    let newTag = await models.Tag.create({tagname: "hello"})
    TagIdToDelete = newTag.id
  })
  afterAll(async () => {
    await models.Tag.destroy({ where: { tagname: 'tagtest' } })
  })
  afterAll(async () => {
    let tagToReset = await models.Tag.findOne({ where: { tagname: 'othertest' } })
    tagToReset.tagname = 'charcuterie'
    await tagToReset.save()
  })  

  it('getAllTags - SUCCESS', () => {
    return request(app)
      .get('/api/tags')
      .expect(200)
      .then(res => {
        let randomNumber = Math.floor(Math.random() * (res.body.length - 1))
        expect(res.body.length).toBeGreaterThan(5)
        expect(res.body[randomNumber]).toHaveProperty('tagname')
      })
  })
  it('addNewTag - SUCCESS', () => {
    return request(app)
      .post('/api/tags')
      .send({ tagname: 'tagtest' })
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ message: 'Tag successfully created' })
      })
  })
  it('updateTag - SUCCESS', () => {
    return request(app)
      .put(`/api/tags/1`)
      .send({ tagname: 'othertest' })
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ message: 'Tag successfully updated' })
      })
  })
  it('deleteTag - SUCCESS', () => {
    return request(app)
      .delete(`/api/tags/${TagIdToDelete}`)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ message: 'Tag successfully deleted' })
      })
  })
})
