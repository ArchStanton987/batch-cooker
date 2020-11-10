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

export const parseFetchedSavedRecipe = data => {
  data.name = data.Recipe.name
  data.id = data.Recipe.id
  data.creatorId = data.Recipe.creatorId
  data.image = data.Recipe.image
  data.name = data.Recipe.name
  data.Tags = data.Recipe.Tags
  delete data.Recipe
  return data
}

export const parseFetchedSavedRecipes = data => {
  if (Array.isArray(data)) {
    data.forEach(recipe => {
      parseFetchedSavedRecipe(recipe)
    })
    return data
  }
}
