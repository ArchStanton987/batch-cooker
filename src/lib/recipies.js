import axios from 'axios'

export const parseFetchedRecipe = data => {
  data.username = data.User.username
  data.ingredients = []
  data.Ingredients.forEach(ingredient => {
    let newIngredient = {}
    newIngredient.recipeIng = ingredient.RecipeIng.id
    newIngredient.name = ingredient.name
    newIngredient.ingredientId = ingredient.RecipeIng.ingredientId
    newIngredient.recipeId = ingredient.RecipeIng.recipeId
    newIngredient.quantity = ingredient.RecipeIng.quantity
    newIngredient.unity = ingredient.RecipeIng.unity
    data.ingredients.push(newIngredient)
  })
  delete data.Ingredients
  delete data.User
  return data
}

export const parseFetchedRecipes = data => {
  if (Array.isArray(data)) {
    data.forEach(recipe => {
      parseFetchedRecipe(recipe)
    })
    return data
  }
}

export const fecthRecipies = async () => {
  const url = `http://192.168.1.27:8000/api/recipes`
  const res = await axios.get(url)
  return res.data
}

export const fetchRecipe = async recipeId => {
  const url = `http://192.168.1.27:8000/api/recipes/${recipeId}`
  const res = await axios.get(url)
  return res.data
}

export const postNewRecipe = async recipe => {
  const url = `http://192.168.1.27:8000/api/recipes`
  const res = await axios.post(url, recipe)
  return res.data
}

export const postNewIngredient = async (recipeId, ingredient) => {
  const url = `http://192.168.1.27:8000/api/recipes/${recipeId}/ingredients`
  const res = await axios.post(url, ingredient)
}