import axios from 'axios'

export const fetchUserInventory = async userId => {
  const url = `http://192.168.1.27:8000/api/inventory/user/${userId}`
  const result = await axios.get(url, { withCredentials: true })
  return result
}

export const parseFetchedInventory = data => {
  let inventory = []
  data.forEach(item => {
    let newItem = {
      ingredientId: item.ingredientId,
      name: item.Ingredient.name,
      category: item.Ingredient.category,
      quantity: item.quantity,
      unity: item.unity
    }
    inventory.push(newItem)
  })
  return inventory
}

export const deleteIngredientFromInventory = async (ingredientId, userId) => {
  const url = `http://192.168.1.27:8000/api/inventory/user/${userId}/ingredients/${ingredientId}`
  try {
    await axios.delete(url, { withCredentials: true })
  } catch (err) {
    return err
  }
}

export const addIngredientToInventory = async (newIng, userId) => {
  const url = `http://192.168.1.27:8000/api/inventory/user/${userId}/ingredients`
  try {
    await axios.post(url, newIng, { withCredentials: true })
  } catch (err) {
    return err
  }
}

export const updateIngredientFromInventory = async (newIng, userId) => {
  const url = `http://192.168.1.27:8000/api/inventory/user/${userId}/ingredients/${newIng.ingredientId}`
  try {
    await axios.put(url, newIng, { withCredentials: true })
  } catch (err) {
    return err
  }
}
