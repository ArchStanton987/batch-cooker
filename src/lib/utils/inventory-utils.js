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
