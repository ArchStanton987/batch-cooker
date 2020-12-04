import axios from 'axios'
import { apiUrl } from '../utils/url-utils'

export const fetchUserInventory = async UserId => {
  const url = `${apiUrl}inventory/user/${UserId}`
  const result = await axios.get(url, { withCredentials: true })
  return result
}

export const deleteIngredientFromInventory = async (IngredientId, UserId) => {
  const url = `${apiUrl}inventory/user/${UserId}/ingredients/${IngredientId}`
  const result = await axios.delete(url, { withCredentials: true })
  return result
}

export const addIngredientToInventory = async (newIng, UserId) => {
  const url = `${apiUrl}inventory/user/${UserId}/ingredients`
  const result = await axios.post(url, newIng, { withCredentials: true })
  return result
}

export const updateIngredientFromInventory = async (newIng, UserId) => {
  const url = `${apiUrl}inventory/user/${UserId}/ingredients/${newIng.IngredientId}`
  const result = await axios.put(url, newIng, { withCredentials: true })
  return result
}
