import axios from 'axios'

export const fecthRecipes = async () => {
  const url = `http://192.168.1.27:8000/api/recipes`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const fetchRecipe = async recipeId => {
  const url = `http://192.168.1.27:8000/api/recipes/${recipeId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const fetchSavedRecipes = async userId => {
  const url = `http://192.168.1.27:8000/api/recipes/users/${userId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const postRecipeInfo = async recipe => {
  const url = `http://192.168.1.27:8000/api/recipes`
  const res = await axios.post(url, recipe, { withCredentials: true })
  return res
}

export const postIngredients = async (recipeId, ingredients) => {
  const url = `http://192.168.1.27:8000/api/recipes/${recipeId}/ingredients`
  const res = await axios.post(url, ingredients, { withCredentials: true })
  return res
}

export const postTags = async (recipeId, tags) => {
  const url = `http://192.168.1.27:8000/api/recipes/${recipeId}/tags`
  const res = await axios.post(url, tags, { withCredentials: true })
  return res
}

export const updateRecipeInfo = async (recipeId, recipe) => {
  const url = `http://192.168.1.27:8000/api/recipes/${recipeId}`
  const res = await axios.put(url, recipe, { withCredentials: true })
  return res
}

export const updateIngredients = async (recipeId, ingredients) => {
  const url = `http://192.168.1.27:8000/api/recipes/${recipeId}/ingredients`
  const res = await axios.put(url, ingredients, { withCredentials: true })
  return res
}

export const updateTags = async (recipeId, tags) => {
  const url = `http://192.168.1.27:8000/api/recipes/${recipeId}/tags`
  const res = await axios.put(url, tags, { withCredentials: true })
  return res
}

export const deleteRecipe = async recipeId => {
  const url = `http://192.168.1.27:8000/api/recipes/${recipeId}`
  const res = await axios.delete(url, { withCredentials: true })
  return res
}
