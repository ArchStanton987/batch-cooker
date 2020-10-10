const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const users = require('./routes/users')
const account = require('./routes/account')
const inventory = require('./routes/inventory')
const recipes = require('./routes/recipes')
const tags = require('./routes/tags')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/users', users)
app.use('/api/account', account)
app.use('/api/inventory', inventory)
app.use('/api/recipes', recipes)
app.use('/api/tags', tags)

// POST /api/account/register
// POST /api/account/login
//
// GET /api/users/                                         get all users
// GET /api/users/:id                                      get one user
// PUT /api/users/:id                                      update one user
// DELETE /api/users/:id                                   delete one user
//
// GET  /api/inventory/user/:userId                       get one user's inventory
// POST /api/inventory/user/:userId/ingredients/:ingId     add one ingredient
// PUT  /api/inventory/user/:userId/ingredients/:ingId     update one ingredient
// DELETE /api/inventory/users/:userId/ingredients/:ingId  delete one ingredient
//
// GET /api/recipes                                       get all recipes
// POST /api/recipes                                      add a new recipie// 
// GET /api/recipes/:recipieId                            get one recipie
// PUT /api/recipes/:recipieId                            update one recipie
// DELETE /api/recipes/:recipieId                         delete one recipie
//
// GET /api/recipes/users/:userId                         get all recipes from a user

// POST /api/recipes/:recipeId/ingredients
// PUT /api/recipes/:recipeId/ingredients/:ingredientId

module.exports = app
