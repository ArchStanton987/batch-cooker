import axios from 'axios'

export const fetchUserShoppingList = async userId => {
  const url = `http://192.168.1.27:8000/api/shoppinglist/user/${userId}`
  const result = await axios.get(url, { withCredentials: true })
  return result
}

export const clearUserShoppingList = async userId => {
  const url = `http://192.168.1.27:8000/api/shoppinglist/user/${userId}`
  const result = await axios.delete(url, { withCredentials: true })
  return result
}

export const deleteIngredientFromShoppingList = async (ingredientId, userId) => {
  const url = `http://192.168.1.27:8000/api/shoppinglist/user/${userId}/ingredients/${ingredientId}`
  const result = await axios.delete(url, { withCredentials: true })
  return result
}

export const addIngredientToShoppingList = async (newIng, userId) => {
  const url = `http://192.168.1.27:8000/api/shoppinglist/user/${userId}/ingredients`
  const result = await axios.post(url, newIng, { withCredentials: true })
  return result
}

export const updateIngredientFromShoppingList = async (newIng, userId) => {
  const url = `http://192.168.1.27:8000/api/shoppinglist/user/${userId}/ingredients/${newIng.ingredientId}`
  const result = await axios.put(url, newIng, { withCredentials: true })
  return result
}

export const addMenuIngredientsToShoppinglist = async (ingredients, userId) => {
  const url = `http://192.168.1.27:8000/api/shoppinglist/user/${userId}/menu`
  const result = await axios.post(url, ingredients, { withCredentials: true })
  return result
}
