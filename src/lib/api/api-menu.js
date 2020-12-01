import axios from 'axios'

export const fetchMenu = async UserId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/menu/users/${UserId}`
  const res = await axios.get(url, { withCredentials: true })
  return res
}

export const clearMenu = async UserId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/menu/users/${UserId}`
  const res = await axios.delete(url, { withCredentials: true })
  return res
}

export const putRecipeMenu = async (recipeId, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/menu/${recipeId}/users/${UserId}`
  const res = await axios.put(url, recipeId, { withCredentials: true })
  return res
}

export const fetchMenuIngredients = async UserId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/menu/users/${UserId}/ingredients`
  const res = await axios.get(url, { withCredentials: true })
  return res
}
