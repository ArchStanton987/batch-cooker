
export const parseFetchedIngredients = data => {
  let ingredientList = []
  data.forEach(item => {
    let newItem = {
      IngredientId: item.IngredientId,
      name: item.Ingredient.name,
      quantity: item.quantity,
      unit: item.unit
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
        IngredientId: ingredient.IngredientId,
        quantity: ingredient.quantity,
        unit: ingredient.unit
      })
    })
  })
  return ingredientList
}

export const getUnitType = unit => {
  unit = unit.trim().toLowerCase()
  if (unit === 'kg' || unit === 'g') {
    return 'poids'
  } else if (unit === 'l' || unit === 'cl' || unit === 'ml') {
    return 'volume'
  } else {
    return 'autre'
  }
}

export const convertToCommonUnit = (value, unit, unitType) => {
  unit = unit.trim().toLowerCase()
  if (unitType === 'poids' && unit === 'kg') {
    value = value * 1000
    return { quantity: value, unit: 'g' }
  } else if (unitType === 'volume' && unit === 'l') {
    value = value * 100
    return { quantity: value, unit: 'cl' }
  } else if (unitType === 'volume' && unit === 'ml') {
    value = value / 10
    return { quantity: value, unit: 'cl' }
  } else {
    return { quantity: value, unit: unit }
  }
}

export const getIngredientsSet = ingredients => {
  let ingredientsSet = new Set()
  ingredients.forEach(ingredient => {
    ingredientsSet.add(`ingId${ingredient.IngredientId}`)
  })
  return ingredientsSet
}

export const getIngredientsObject = (ingredientsSet, ingredients) => {
  let ingredientsObject = {}
  ingredientsSet.forEach(ingredient => {
    ingredientsObject[ingredient] = { quantity: 0, unit: '' }
  })
  ingredients.forEach(ingredient => {
    let key = `ingId${ingredient.IngredientId}`
    ingredientsObject[key].IngredientId = ingredient.IngredientId
    ingredientsObject[key].quantity = ingredient.quantity
    ingredientsObject[key].unit = ingredient.unit || ''
  })
  return ingredientsObject
}

export const getShoppingListEntries = (allIngredients, UserId) => {
  let shopIngredients = allIngredients[0].data
  let inventoryIngredients = parseFetchedIngredients(allIngredients[1].data)
  let menuIngredients = parseRecipesIngredients(allIngredients[2].data)

  let shopIngredientsSet = getIngredientsSet(shopIngredients)
  let inventoryIngredientsSet = getIngredientsSet(inventoryIngredients)
  let neededIngredientsSet = getIngredientsSet(menuIngredients)

  let shopIngredientsObject = getIngredientsObject(shopIngredientsSet, shopIngredients)
  let inventoryIngredientsObject = getIngredientsObject(
    inventoryIngredientsSet,
    inventoryIngredients
  )
  let neededIngredientsObject = getIngredientsObject(neededIngredientsSet, menuIngredients)

  for (let key in neededIngredientsObject) {
    neededIngredientsObject[key].UserId = UserId

    let isInShoppingList = shopIngredientsSet.has(key)
    let isInInventory = inventoryIngredientsSet.has(key)

    let neededQty = neededIngredientsObject[key].quantity
    let neededUnit = neededIngredientsObject[key].unit.trim().toLowerCase() || ''
    let neededUnitType = getUnitType(neededUnit)

    if (isInShoppingList) {
      let shopQty = shopIngredientsObject[key].quantity
      let shopUnit = shopIngredientsObject[key].unit.trim().toLowerCase() || ''
      let shopUnitType = getUnitType(shopUnit)
      if (
        neededUnitType === shopUnitType &&
        neededUnit !== shopUnit &&
        neededUnitType !== 'autre'
      ) {
        let convNeeded = convertToCommonUnit(neededQty, neededUnit, neededUnitType)
        let convertedShop = convertToCommonUnit(shopQty, shopUnit, shopUnitType)
        neededIngredientsObject[key].quantity = convNeeded.quantity + convertedShop.quantity
        neededIngredientsObject[key].unit = convNeeded.unit
      } else {
        neededIngredientsObject[key].quantity += shopIngredientsObject[key].quantity
      }
    } else if (!isInShoppingList && isInInventory) {
      let invQty = inventoryIngredientsObject[key].quantity
      let invUnit = inventoryIngredientsObject[key].unit.trim().toLowerCase() || ''
      let invUnitType = getUnitType(invUnit)
      if (neededUnitType === invUnitType && neededUnit !== invUnit && neededUnitType !== 'autre') {
        let convNeeded = convertToCommonUnit(neededQty, neededUnit, neededUnitType)
        let convInv = convertToCommonUnit(invQty, invUnit, invUnitType)
        neededIngredientsObject[key].quantity = convNeeded.quantity - convInv.quantity
        neededIngredientsObject[key].unit = convNeeded.unit
      } else {
        neededIngredientsObject[key].quantity -= inventoryIngredientsObject[key].quantity
      }
    }
  }
  let newShoppingListEntries = Object.values(neededIngredientsObject)
  return newShoppingListEntries
}
