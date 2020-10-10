import React, { useState, useEffect, useRef } from 'react'

import RecipeCard from '../containers/RecipeCard'
import { fecthRecipies, parseFetchedRecipes } from '../lib/recipies'
import '../sass/pages/_Recipes.scss'
import Searchbox from '../containers/Searchbox'
import searchIcon from '../assets/icons/search.svg'
import chevron from '../assets/icons/chevron.svg'
import '../sass/pages/_FullRecipe.scss'

export default function Recipes() {
  const [userRecipes, setUserRecipes] = useState([])
  const [isModalActive, setRecipeModal] = useState(false)
  const [newRecipe, setNewRecipe] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [isExpended, setDrawer] = useState(false)

  const scrollableRef = useRef(null)

  const toggleDrawer = () => {
    setDrawer(prevState => !prevState)
  }

  const handleFetchRecipes = async () => {
    const results = await fecthRecipies()
    const parsedResults = parseFetchedRecipes(results)
    setUserRecipes(parsedResults)
  }

  const toggleModal = () => {
    setRecipeModal(prevState => !prevState)
  }

  const handleSearchInput = e => {
    setSearchInput(e.currentTarget.value)
  }
  const handleResetSearchInput = () => {
    const searchboxSearch = document.getElementById('recipes-searchbox_search') || {}
    searchboxSearch.value = ''
    setSearchInput('')
  }
  // const handleEditRecipe = id => {
  //   let ingredientData = inventory.filter(ingredient => ingredient.ingredientId === id)
  //   setNewIngredient(ingredientData[0])
  //   toggleModal()
  // }

  useEffect(() => {
    handleFetchRecipes()
  }, [])

  return (
    <>
      <h2>Recettes</h2>
      <div className="section-container">
        <div onClick={toggleDrawer} className="drawer-container">
          <h3>Tags</h3>
          <img
            alt="reveal categories"
            src={chevron}
            className={isExpended ? 'recipe-tags-arrow' : 'recipe-tags-arrow rotated'}
          />
        </div>
        <div className={isExpended ? 'collapsible' : 'collapsible retracted'}>
          <div className="search-tag-container">
            <img src={searchIcon} className="search-tag" alt="search by tag" />
            <input type="search" className="recipies-search-tag" />
          </div>
          <ul className="taglist">
            <li>
              <p>#charcuterie</p>
            </li>
            <li>
              <p>#saison</p>
            </li>
          </ul>
        </div>
      </div>
      <div ref={scrollableRef} className="recipes section-container">
        <h3>Mes recettes</h3>
        <ul className="recipes-list">
          {userRecipes
            .filter(recipe => recipe.name.toLowerCase().includes(searchInput.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(recipe => {
              return <RecipeCard key={`user-recipe-${recipe.id}`} recipe={recipe} />
            })}
        </ul>
      </div>
      <Searchbox
        toggleModal={toggleModal}
        scrollableRef={scrollableRef}
        handleResetSearchInput={handleResetSearchInput}
        handleSearchInput={handleSearchInput}
        parentName={'recipes'}
        placeholder={'recherche par nom'}
      />
    </>
  )
}
