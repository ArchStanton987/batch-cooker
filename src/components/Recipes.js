import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Recipe from '../containers/RecipeCard'
import '../sass/pages/_Recipes.scss'
import Toolbox from '../containers/Toolbox'

export default function Recipes() {
  const [userRecipes, setUserRecipes] = useState([])
  const [isModalActive, setRecipeModal] = useState(false)
  const [newRecipe, setNewRecipe] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  const scrollableRef = useRef(null)

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

  const toggleModal = () => {
    setRecipeModal(prevState => !prevState)
  }

  const handleSearchInput = e => {
    setSearchInput(e.currentTarget.value)
  }
  const handleResetSearchInput = () => {
    const toolboxSearch = document.getElementById('recipes-toolbox_search') || {}
    toolboxSearch.value = ''
    setSearchInput('')
  }
  // const handleEditRecipe = id => {
  //   let ingredientData = inventory.filter(ingredient => ingredient.ingredientId === id)
  //   setNewIngredient(ingredientData[0])
  //   toggleModal()
  // }

  useEffect(() => {
    getUserRecipes()
  }, [])

  return (
    <>
      <h2>Recettes</h2>
      <div ref={scrollableRef} className="recipes section-container">
        <h3>Mes recettes</h3>
        <ul className="recipes-list">
          {userRecipes
            .filter(recipe => recipe.name.toLowerCase().includes(searchInput.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(recipe => {
              return <Recipe key={`user-recipe-${recipe.id}`} recipe={recipe} />
            })}
        </ul>
      </div>
      <Toolbox
        toggleModal={toggleModal}
        scrollableRef={scrollableRef}
        handleResetSearchInput={handleResetSearchInput}
        handleSearchInput={handleSearchInput}
        parentName={'recipes'}
      />
    </>
  )
}
