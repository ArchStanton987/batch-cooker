import axios from 'axios'
import { apiUrl } from '../utils/url-utils'

export const fetchUserShoppingList = async UserId => {
  const url = `https://batch-cooker.herokuapp.com/api/shoppinglist/user/${UserId}`
  const result = await axios.get(url, { withCredentials: true })
  return result
}

export const clearUserShoppingList = async UserId => {
  const url = `https://batch-cooker.herokuapp.com/api/shoppinglist/user/${UserId}`
  const result = await axios.delete(url, { withCredentials: true })
  return result
}

export const deleteIngredientFromShoppingList = async (IngredientId, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/shoppinglist/user/${UserId}/ingredients/${IngredientId}`
  const result = await axios.delete(url, { withCredentials: true })
  return result
}

export const addIngredientToShoppingList = async (newIng, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/shoppinglist/user/${UserId}/ingredients`
  const result = await axios.post(url, newIng, { withCredentials: true })
  return result
}

export const updateIngredientFromShoppingList = async (newIng, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/shoppinglist/user/${UserId}/ingredients/${newIng.IngredientId}`
  const result = await axios.put(url, newIng, { withCredentials: true })
  return result
}

export const addMenuIngredientsToShoppinglist = async (ingredients, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/shoppinglist/user/${UserId}/menu`
  const result = await axios.post(url, ingredients, { withCredentials: true })
  return result
}
