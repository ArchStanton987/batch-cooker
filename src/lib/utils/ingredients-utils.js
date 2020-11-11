export const parseFetchedIngredients = data => {
  let ingredientList = []
  data.forEach(item => {
    let newItem = {
      ingredientId: item.ingredientId,
      name: item.Ingredient.name,
      category: item.Ingredient.category,
      quantity: item.quantity,
      unity: item.unity
    }
    ingredientList.push(newItem)
  })
  return ingredientList
}
