import axios from 'axios'

export const fetchMenu = async userId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/menu/users/${userId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const clearMenu = async userId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/menu/users/${userId}`
  const res = await axios.delete(url, { withCredentials: true })
  return res
}

export const putRecipeMenu = async (recipeId, userId) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/menu/${recipeId}/users/${userId}`
  const res = await axios.put(url, recipeId, { withCredentials: true })
  return res
}

export const fetchMenuIngredients = async userId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/menu/users/${userId}/ingredients`
  const res = await axios.get(url, { withCredentials: true })
  return res
}
