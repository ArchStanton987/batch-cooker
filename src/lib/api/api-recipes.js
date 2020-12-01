import axios from 'axios'

export const fetchRecipes = async () => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const fetchRandomRecipes = async () => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/random?limit=7`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const fetchSearchResults = async searchField => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/search?searchfield=${searchField}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const fetchRecipe = async recipeId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${recipeId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const postRecipeInfo = async recipe => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes`
  const res = await axios.post(url, recipe, { withCredentials: true })
  return res
}

export const postIngredients = async (recipeId, ingredients) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${recipeId}/ingredients`
  const res = await axios.post(url, ingredients, { withCredentials: true })
  return res
}

export const postTags = async (recipeId, tags) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${recipeId}/tags`
  const res = await axios.post(url, tags, { withCredentials: true })
  return res
}

export const updateRecipeInfo = async (recipeId, recipe) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${recipeId}`
  const res = await axios.put(url, recipe, { withCredentials: true })
  return res
}

export const updateIngredients = async (recipeId, ingredients) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${recipeId}/ingredients`
  const res = await axios.put(url, ingredients, { withCredentials: true })
  return res
}

export const updateTags = async (recipeId, tags) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${recipeId}/tags`
  const res = await axios.put(url, tags, { withCredentials: true })
  return res
}

export const deleteRecipe = async recipeId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${recipeId}`
  const res = await axios.delete(url, { withCredentials: true })
  return res
}

export const fetchSavedRecipes = async UserId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/saves/users/${UserId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const saveRecipe = async (recipeId, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/saves/${recipeId}/users/${UserId}`
  const res = await axios.put(url, recipeId, { withCredentials: true })
  return res
}
