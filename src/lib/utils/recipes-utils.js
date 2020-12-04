export const parseFetchedFullRecipe = data => {
  data.username = data.User.username
  data.ingredients = []
  data.Ingredients.forEach(ingredient => {
    let newIngredient = {}
    newIngredient.name = ingredient.name
    newIngredient.category = ingredient.category
    newIngredient.IngredientId = ingredient.RecipeIng.IngredientId
    newIngredient.RecipeId = ingredient.RecipeIng.RecipeId
    newIngredient.quantity = ingredient.RecipeIng.quantity
    newIngredient.unit = ingredient.RecipeIng.unit
    data.ingredients.push(newIngredient)
  })
  delete data.Ingredients
  delete data.User
  return data
}

export const parseFetchedFullRecipes = data => {
  if (Array.isArray(data)) {
    data.forEach(recipe => {
      parseFetchedFullRecipe(recipe)
    })
    return data
  }
}

export const parseFetchedPartialRecipe = data => {
  data.name = data.Recipe.name
  data.id = data.Recipe.id
  data.creatorId = data.Recipe.creatorId
  data.image = data.Recipe.image
  data.name = data.Recipe.name
  data.Tags = data.Recipe.Tags
  delete data.Recipe
  return data
}

export const parseFetchedPartialRecipes = data => {
  if (Array.isArray(data)) {
    data.forEach(recipe => {
      parseFetchedPartialRecipe(recipe)
    })
    return data
  }
}

export const parseRecipeSaves = res => {
  let recipes = res.data.recipes
  let saves = res.data.saves || []
  if (saves.length > 0) {
    let saveSet = new Set()
    saves.forEach(recipe => saveSet.add(recipe.RecipeId))
    recipes.forEach(recipe => {
      return saveSet.has(recipe.id) ? (recipe.isSavedByUser = 1) : (recipe.isSavedByUser = 0)
    })
  } else {
    recipes.forEach(recipe => (recipe.isSavedByUser = 0))
  }
  return recipes
}
