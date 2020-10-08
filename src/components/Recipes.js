import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Recipe from '../containers/Recipe'
import '../sass/pages/_Recipes.scss'

export default function Recipes() {
  const [userRecipes, setUserRecipes] = useState([])

  const getUserRecipes = () => {
    const url = 'http://192.168.1.27:8000/api/recipes/users/1'
    axios.get(url).then(res => {
      res.data.forEach(recipe => {
        recipe.ingredients = []
        recipe.Ingredients.forEach(ingredient => {
          let newIngredient = {}
          newIngredient.recipeIng = ingredient.RecipeIng.id
          newIngredient.name = ingredient.name
          newIngredient.ingredientId = ingredient.RecipeIng.ingredientId
          newIngredient.recipeId = ingredient.RecipeIng.recipeId
          newIngredient.quantity = ingredient.RecipeIng.quantity
          newIngredient.unity = ingredient.RecipeIng.unity
          recipe.ingredients.push(newIngredient)
        })
        delete recipe.Ingredients
      })
      setUserRecipes(res.data)
    })
  }

  useEffect(() => {
    getUserRecipes()
  }, [])

  return (
    <>
      <h2>Recettes</h2>
      <div className="recipes h3-container">
        <h3>Mes recettes</h3>
        <ul className="recipes-list">
          {userRecipes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(recipe => {
              return <Recipe recipe={recipe} />
            })}
        </ul>
      </div>
    </>
  )
}
