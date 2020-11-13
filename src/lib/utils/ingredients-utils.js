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

export const parseRecipesIngredients = recipes => {
  let ingredientList = []
  recipes.forEach(recipe => {
    recipe.Recipe.RecipeIngs.forEach(ingredient => {
      ingredientList.push({
        ingredientId: ingredient.ingredientId,
        quantity: ingredient.quantity,
        unity: ingredient.unity
      })
    })
  })
  return ingredientList
}
