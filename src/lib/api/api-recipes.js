import axios from 'axios'
import { apiUrl } from '../utils/url-utils'

export const fetchRecipes = async () => {
  const url = `${apiUrl}recipes`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const fetchRandomRecipes = async () => {
  const url = `${apiUrl}recipes/random?limit=7`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const fetchSearchResults = async searchField => {
  const url = `${apiUrl}recipes/search?searchfield=${searchField}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const fetchRecipe = async RecipeId => {
  const url = `${apiUrl}recipes/${RecipeId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const postRecipeInfo = async recipe => {
  const url = `${apiUrl}recipes`
  const res = await axios.post(url, recipe, { withCredentials: true })
  return res
}

export const postIngredients = async (RecipeId, ingredients) => {
  const url = `${apiUrl}recipes/${RecipeId}/ingredients`
  const res = await axios.post(url, ingredients, { withCredentials: true })
  return res
}

export const postTags = async (RecipeId, tags) => {
  const url = `${apiUrl}recipes/${RecipeId}/tags`
  const res = await axios.post(url, tags, { withCredentials: true })
  return res
}

export const updateRecipeInfo = async (RecipeId, recipe) => {
  const url = `${apiUrl}recipes/${RecipeId}`
  const res = await axios.put(url, recipe, { withCredentials: true })
  return res
}

export const updateIngredients = async (RecipeId, ingredients) => {
  const url = `${apiUrl}recipes/${RecipeId}/ingredients`
  const res = await axios.put(url, ingredients, { withCredentials: true })
  return res
}

export const updateTags = async (RecipeId, tags) => {
  const url = `${apiUrl}recipes/${RecipeId}/tags`
  const res = await axios.put(url, tags, { withCredentials: true })
  return res
}

export const deleteRecipe = async RecipeId => {
  const url = `${apiUrl}recipes/${RecipeId}`
  const res = await axios.delete(url, { withCredentials: true })
  return res
}

export const fetchSavedRecipes = async UserId => {
  const url = `${apiUrl}recipes/saves/users/${UserId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const saveRecipe = async (RecipeId, UserId) => {
  const url = `${apiUrl}recipes/saves/${RecipeId}/users/${UserId}`
  const res = await axios.put(url, RecipeId, { withCredentials: true })
  return res
}
