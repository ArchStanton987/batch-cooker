import axios from 'axios'

export const fetchUserInventory = async userId => {
  const url = `http://192.168.1.27:8000/api/inventory/user/${userId}`
  const result = await axios.get(url, { withCredentials: true })
  return result
}

export const deleteIngredientFromInventory = async (ingredientId, userId) => {
  const url = `http://192.168.1.27:8000/api/inventory/user/${userId}/ingredients/${ingredientId}`
  const result = await axios.delete(url, { withCredentials: true })
  return result
}

export const addIngredientToInventory = async (newIng, userId) => {
  const url = `http://192.168.1.27:8000/api/inventory/user/${userId}/ingredients`
  const result = await axios.post(url, newIng, { withCredentials: true })
  return result
}

export const updateIngredientFromInventory = async (newIng, userId) => {
  const url = `http://192.168.1.27:8000/api/inventory/user/${userId}/ingredients/${newIng.ingredientId}`
  const result = await axios.put(url, newIng, { withCredentials: true })
  return result
}