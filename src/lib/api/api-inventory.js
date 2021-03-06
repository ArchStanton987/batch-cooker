import axios from 'axios'

export const fetchUserInventory = async UserId => {
  const url = `https://batch-cooker.herokuapp.com/api/inventory/user/${UserId}`
  const result = await axios.get(url, { withCredentials: true })
  return result
}

export const deleteIngredientFromInventory = async (IngredientId, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/inventory/user/${UserId}/ingredients/${IngredientId}`
  const result = await axios.delete(url, { withCredentials: true })
  return result
}

export const addIngredientToInventory = async (newIng, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/inventory/user/${UserId}/ingredients`
  const result = await axios.post(url, newIng, { withCredentials: true })
  return result
}

export const updateIngredientFromInventory = async (newIng, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/inventory/user/${UserId}/ingredients/${newIng.IngredientId}`
  const result = await axios.put(url, newIng, { withCredentials: true })
  return result
}
