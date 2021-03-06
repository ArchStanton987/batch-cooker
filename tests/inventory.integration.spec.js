// test api/inventory routes

const request = require('supertest')
const app = require('../server/app')
const models = require('../server/models')

describe('INVENTORY', () => {
  let token = null

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
    const newInvItem = { UserId: 3, IngredientId: 1, quantity: 5, unit: 'g' }
    await models.Inventory.create(newInvItem, {
      fields: ['UserId', 'IngredientId', 'quantity', 'unit']
    })
  })

  afterAll(async () => {
    const invToDelete = await models.Inventory.findOne({
      where: { UserId: 1, IngredientId: 4 }
    })
    await invToDelete.destroy()

    const ingredientToDelete = await models.Ingredient.findOne({ where: { name: 'melfort' } })
    const invToDelete2 = await models.Inventory.findOne({
      where: { IngredientId: ingredientToDelete.id }
    })
    await invToDelete2.destroy()
    await ingredientToDelete.destroy()

    const invToReset = await models.Inventory.findOne({ where: { UserId: 1, IngredientId: 1 } })
    invToReset.quantity = 1
    await invToReset.save()

    const possibleInvToDelete = await models.Inventory.findOne({
      where: { UserId: 3, IngredientId: 1 }
    })
    if (possibleInvToDelete) {
      await possibleInvToDelete.destroy()
    }
  })

  it('getUserInventory - SUCCESS', () => {
    return request(app)
      .get('/api/inventory/user/1')
      .set('cookie', [`access_token=${token}`])
      .expect(200)
      .then(res => {
        expect(res.body.length).toEqual(3)
        expect(res.body[0].IngredientId).toEqual(1)
      })
  })

  it('addToInventory - SUCCESS : non-existing ingredient, not in inventory', () => {
    return request(app)
      .post('/api/inventory/user/1/ingredients')
      .set('cookie', [`access_token=${token}`])
      .send({
        ingredientName: 'melfort',
        category: 'assaisonnements et condiments',
        quantity: 2,
        unit: 'l'
      })
      .expect(200)
      .then(res => {
        expect(res.body.UserId).toEqual(1)
        expect(res.body.quantity).toEqual(2)
        expect(res.body.unit).toEqual('l')
      })
  })
  it('addToInventory - SUCCESS : existing ingredient, not in inventory', () => {
    return request(app)
      .post('/api/inventory/user/1/ingredients')
      .set('cookie', [`access_token=${token}`])
      .send({
        ingredientName: 'truite fumée',
        category: 'viandes et poissons',
        quantity: 150,
        unit: 'g'
      })
      .expect(200)
      .then(res => {
        expect(res.body.UserId).toEqual(1)
        expect(res.body.IngredientId).toEqual(4)
        expect(res.body.quantity).toEqual(150)
        expect(res.body.unit).toEqual('g')
      })
  })
  it('addToInventory - SUCCESS : existing ingredient, in inventory', () => {
    return request(app)
      .post('/api/inventory/user/1/ingredients')
      .set('cookie', [`access_token=${token}`])
      .send({
        ingredientName: 'truite fumée',
        category: 'viandes et poissons',
        quantity: 150,
        unit: 'g'
      })
      .expect(200)
      .then(res => {
        expect(res.body.UserId).toEqual(1)
        expect(res.body.IngredientId).toEqual(4)
        expect(res.body.quantity).toEqual(300)
        expect(res.body.unit).toEqual('g')
      })
  })
  it('updateFromInventory - SUCCESS', () => {
    return request(app)
      .put('/api/inventory/user/1/ingredients/1')
      .set('cookie', [`access_token=${token}`])
      .send({ quantity: 10 })
      .expect(200)
      .then(res => {
        expect(res.body.UserId).toEqual(1)
        expect(res.body.IngredientId).toEqual(1)
        expect(res.body.quantity).toEqual(10)
      })
  })
  it('deleteFromInventory - SUCCESS', () => {
    return request(app)
      .delete('/api/inventory/user/3/ingredients/1')
      .set('cookie', [`access_token=${token}`])
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ message: 'Ingredient deleted from inventory' })
      })
  })
})
