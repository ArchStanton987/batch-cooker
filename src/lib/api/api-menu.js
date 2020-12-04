import axios from 'axios'
import { apiUrl } from '../utils/url-utils'

export const fetchMenu = async UserId => {
  const url = `${apiUrl}recipes/menu/users/${UserId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const clearMenu = async UserId => {
  const url = `${apiUrl}recipes/menu/users/${UserId}`
  const res = await axios.delete(url, { withCredentials: true })
  return res
}

export const putRecipeMenu = async (RecipeId, UserId) => {
  const url = `${apiUrl}recipes/menu/${RecipeId}/users/${UserId}`
  const res = await axios.put(url, RecipeId, { withCredentials: true })
  return res
}

export const fetchMenuIngredients = async UserId => {
  const url = `${apiUrl}recipes/menu/users/${UserId}/ingredients`
  const res = await axios.get(url, { withCredentials: true })
  return res
}
