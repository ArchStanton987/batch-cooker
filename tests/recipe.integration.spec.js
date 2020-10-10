// test api/inventory routes

const request = require('supertest')
const app = require('../server/app')
const models = require('../server/models')

describe('RECIPE', () => {
  let recipeIdToDelete = null
  let ingredientIdToDelete = null
  let recipeIngIdToDelete = null
  let recipeIngIdToDelete2 = null

  afterAll(async () => {
    const recipeToDelete = await models.Recipe.findOne({
      where: {
        name: 'abracadabra'
      }
    })
    await recipeToDelete.destroy()
  })
  afterAll(async () => {
    let recipeToReset = await models.Recipe.findByPk(1)
    recipeToReset.name = 'tournedos au gibolin'
    recipeToReset.image = null
    recipeToReset.url = null
    recipeToReset.content =
      '1) Saisir le tournedos avec une dose généreuse de saindoux à feu vif pendant 3 minutes. \n 2) Arroser avec 10cl de gibolin, ajouter du persil \n 3) Dégustez'
    recipeToReset.save()
  })
  afterAll(async () => {
    let ingredient = await models.Ingredient.findByPk(ingredientIdToDelete)
    await ingredient.destroy()
  })
  afterAll(async () => {
    let recipeIng = await models.RecipeIng.findByPk(recipeIngIdToDelete)
    await recipeIng.destroy()
  })
  afterAll(async () => {
    let recipeIng = await models.RecipeIng.findByPk(recipeIngIdToDelete2)
    await recipeIng.destroy()
  })
  afterAll(async () => {
    let ingredientToReset = await models.RecipeIng.findOne({
      where: { recipeId: 1, ingredientId: 13 }
    })
    ingredientToReset.quantity = 2
    ingredientToReset.unity = null
    await ingredientToReset.save()
  })
  afterAll(async () => {
    let ingredient = { ingredientId: 16, recipeId: 1, quantity: 4, unity: 'g' }
    await models.RecipeIng.create(ingredient)
  })

  beforeAll(async () => {
    const newRecipe = {
      creatorId: 1,
      name: 'test',
      image: null,
      url: null,
      content: 'Recette pour tester '
    }
    let recipe = await models.Recipe.create(newRecipe)
    recipeIdToDelete = recipe.id
  })

  it('getAllRecipe - SUCESS', () => {
    return request(app)
      .get('/api/recipes')
      .expect(200)
      .then(res => {
        let randomNumber = Math.floor(Math.random() * (res.body.length - 1))
        expect(res.body.length).toBeGreaterThan(6)
        expect(res.body[randomNumber]).toHaveProperty('id')
        expect(res.body[randomNumber]).toHaveProperty('creatorId')
        expect(res.body[randomNumber]).toHaveProperty('name')
        expect(res.body[randomNumber]).toHaveProperty('content')
        expect(res.body[randomNumber]).toHaveProperty('Ingredients')
        expect(res.body[randomNumber]).toHaveProperty('guests')
      })
  })

  it('addNewRecipe - SUCESS', () => {
    return request(app)
      .post('/api/recipes')
      .send({
        creatorId: 1,
        name: 'abracadabra',
        image: null,
        url: null,
        content: 'Cette recette est magique'
      })
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ message: 'Recipe successfully created' })
      })
  })
  it('getOneRecipeById - FAILURE', () => {
    return request(app)
      .get('/api/recipes/987')
      .expect(404)
      .then(res => {
        expect(res.body).toEqual({ message: 'Recipe not found' })
      })
  })
  it('getOneRecipeById - SUCCESS', () => {
    return request(app)
      .get('/api/recipes/1')
      .expect(200)
      .then(res => {
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('creatorId')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('content')
        expect(res.body).toHaveProperty('Ingredients')
        expect(res.body).toHaveProperty('guests')
        expect(res.body.Ingredients.length).toBeGreaterThan(1)
      })
  })
  it('updateOneRecipe - SUCCESS', () => {
    return request(app)
      .put('/api/recipes/1')
      .send({
        name: 'tournedos au gibolin revisité',
        image: null,
        url: null,
        content: 'La version revisitée de M. Saladin.'
      })
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ message: 'Recipe successfully updated' })
      })
  })
  it('deleteOneRecipe - SUCCESS', () => {
    return request(app)
      .delete(`/api/recipes/${recipeIdToDelete}`)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ message: 'Recipe successfully deleted' })
      })
  })
  it('getRecipesOfUser - SUCCESS', () => {
    return request(app)
      .get('/api/recipes/users/1')
      .expect(200)
      .then(res => {
        let randomNumber = Math.floor(Math.random() * (res.body.length - 1))
        expect(res.body.length).toBeGreaterThan(3)
        expect(res.body[randomNumber]).toHaveProperty('id')
        expect(res.body[randomNumber]).toHaveProperty('creatorId')
        expect(res.body[randomNumber]).toHaveProperty('name')
        expect(res.body[randomNumber]).toHaveProperty('content')
        expect(res.body[randomNumber]).toHaveProperty('Ingredients')
        expect(res.body[randomNumber]).toHaveProperty('guests')
      })
  })
  it('addIngredientInRecipe - SUCCESS - NON EXISTING INGREDIENT', () => {
    let newIngredientId = null
    const ingredient = {
      name: 'mayonnaise',
      category: 'assaisonnements et condiments',
      quantity: 50,
      unity: 'g'
    }
    return request(app)
      .post('/api/recipes/1/ingredients')
      .send(ingredient)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ message: 'Ingredient successfully associated with recipe' })
      })
      .then(async () => {
        const newIngredient = await models.Ingredient.findOne({ where: { name: ingredient.name } })
        ingredientIdToDelete = newIngredient.id
        expect(newIngredient).toHaveProperty('id')
        expect(newIngredient).toHaveProperty('name', ingredient.name)
        expect(newIngredient).toHaveProperty('category', ingredient.category)
        newIngredientId = newIngredient.id
      })
      .then(async () => {
        const newRecipeIng = await models.RecipeIng.findOne({
          where: { recipeId: 1, ingredientId: newIngredientId }
        })
        recipeIngIdToDelete = newRecipeIng.id
        expect(newRecipeIng).toHaveProperty('id')
        expect(newRecipeIng).toHaveProperty('ingredientId', newIngredientId)
        expect(newRecipeIng).toHaveProperty('recipeId', 1)
        expect(newRecipeIng).toHaveProperty('quantity', 50)
        expect(newRecipeIng).toHaveProperty('unity', 'g')
      })
  })
  it('addIngredientInRecipe - SUCCESS - EXISTING INGREDIENT', () => {
    const ingredient = {
      name: 'poivre',
      category: 'assaisonnements et condiments',
      quantity: 5,
      unity: 'g'
    }
    return request(app)
      .post('/api/recipes/1/ingredients')
      .send(ingredient)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ message: 'Ingredient successfully associated with recipe' })
      })
      .then(async () => {
        const newRecipeIng = await models.RecipeIng.findOne({
          where: { recipeId: 1, ingredientId: 1 }
        })
        recipeIngIdToDelete2 = newRecipeIng.id
        expect(newRecipeIng).toHaveProperty('id')
        expect(newRecipeIng).toHaveProperty('ingredientId', 1)
        expect(newRecipeIng).toHaveProperty('recipeId', 1)
        expect(newRecipeIng).toHaveProperty('quantity', 5)
        expect(newRecipeIng).toHaveProperty('unity', 'g')
      })
  })
  it('getIngredientFromRecipe - SUCCESS', () => {
    return request(app)
      .get('/api/recipes/1/ingredients/13')
      .expect(200)
      .then(res => {
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('quantity')
        expect(res.body).toHaveProperty('unity')
      })
  })
  it('updateIngredientFromRecipe - SUCCESS', () => {
    const newIngredient = {
      quantity: 5,
      unity: 'kg'
    }
    return request(app)
      .put('/api/recipes/1/ingredients/13')
      .send(newIngredient)
      .expect(200)
      .then(res => {
        expect(res.body).toHaveProperty('quantity', newIngredient.quantity)
        expect(res.body).toHaveProperty('unity', newIngredient.unity)
      })
  })
  it('deleteIngredientFromRecipe - SUCCESS', () => {
    return request(app)
      .delete('/api/recipes/1/ingredients/16')
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ message: 'Ingredient deleted' })
      })
  })
})
