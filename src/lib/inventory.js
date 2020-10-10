import axios from 'axios'

export const fetchUserInventory = async userId => {
  const url = `http://192.168.1.27:8000/api/inventory/user/${userId}`
  const result = await axios.get(url)
  return result.data
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
