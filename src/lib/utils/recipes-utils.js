export const parseFetchedRecipe = data => {
  data.username = data.User.username
  data.ingredients = []
  data.Ingredients.forEach(ingredient => {
    let newIngredient = {}
    newIngredient.recipeIng = ingredient.RecipeIng.id
    newIngredient.name = ingredient.name
    newIngredient.category = ingredient.category
    newIngredient.ingredientId = ingredient.RecipeIng.ingredientId
    newIngredient.recipeId = ingredient.RecipeIng.recipeId
    newIngredient.quantity = ingredient.RecipeIng.quantity
    newIngredient.unity = ingredient.RecipeIng.unity
    data.ingredients.push(newIngredient)
  })
  delete data.Ingredients
  delete data.User
  return data
}

export const parseFetchedRecipes = data => {
  if (Array.isArray(data)) {
    data.forEach(recipe => {
      parseFetchedRecipe(recipe)
    })
    return data
  }
}
