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

export const fetchRecipe = async RecipeId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${RecipeId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const postRecipeInfo = async recipe => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes`
  const res = await axios.post(url, recipe, { withCredentials: true })
  return res
}

export const postIngredients = async (RecipeId, ingredients) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${RecipeId}/ingredients`
  const res = await axios.post(url, ingredients, { withCredentials: true })
  return res
}

export const postTags = async (RecipeId, tags) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${RecipeId}/tags`
  const res = await axios.post(url, tags, { withCredentials: true })
  return res
}

export const updateRecipeInfo = async (RecipeId, recipe) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${RecipeId}`
  const res = await axios.put(url, recipe, { withCredentials: true })
  return res
}

export const updateIngredients = async (RecipeId, ingredients) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${RecipeId}/ingredients`
  const res = await axios.put(url, ingredients, { withCredentials: true })
  return res
}

export const updateTags = async (RecipeId, tags) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${RecipeId}/tags`
  const res = await axios.put(url, tags, { withCredentials: true })
  return res
}

export const deleteRecipe = async RecipeId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/${RecipeId}`
  const res = await axios.delete(url, { withCredentials: true })
  return res
}

export const fetchSavedRecipes = async UserId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/saves/users/${UserId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const saveRecipe = async (RecipeId, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/saves/${RecipeId}/users/${UserId}`
  const res = await axios.put(url, RecipeId, { withCredentials: true })
  return res
}
