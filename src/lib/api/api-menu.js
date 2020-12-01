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

export const putRecipeMenu = async (RecipeId, UserId) => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/menu/${RecipeId}/users/${UserId}`
  const res = await axios.put(url, RecipeId, { withCredentials: true })
  return res
}

export const fetchMenuIngredients = async UserId => {
  const url = `https://batch-cooker.herokuapp.com/api/recipes/menu/users/${UserId}/ingredients`
  const res = await axios.get(url, { withCredentials: true })
  return res
}
