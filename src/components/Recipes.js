import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import RecipeCard from '../containers/RecipeCard'
import { fecthRecipies, parseFetchedRecipes } from '../lib/recipies'
import Searchbox from '../containers/Searchbox'
import searchIcon from '../assets/icons/search.svg'
import chevron from '../assets/icons/chevron.svg'
import plusIcon from '../assets/icons/plus.svg'
import '../sass/pages/_Recipes.scss'
import '../sass/pages/_FullRecipe.scss'

export default function Recipes() {
  const [userRecipes, setUserRecipes] = useState([])
  const [searchInput, setSearchInput] = useState('')
  // const [activeTags, setActiveTags] = useState('')
  const [isExpended, setDrawer] = useState(false)

  const scrollableRef = useRef(null)

  const toggleDrawer = () => setDrawer(prevState => !prevState)

  const handleFetchRecipes = async () => {
    const results = await fecthRecipies()
    const parsedResults = parseFetchedRecipes(results)
    setUserRecipes(parsedResults)
  }

  const handleSearchInput = e => {
    setSearchInput(e.currentTarget.value)
  }
  const handleResetSearchInput = () => {
    const searchboxSearch = document.getElementById('recipes-searchbox_search') || {}
    searchboxSearch.value = ''
    setSearchInput('')
  }

  useEffect(() => {
    handleFetchRecipes()
  }, [])

  return (
    <>
      <div className="page">
        <h2>Mes recettes</h2>
        <div ref={scrollableRef} className="recipes section-container">
          <h3>Liste</h3>
          <ul className="recipes-list">
            {userRecipes
              .filter(recipe => recipe.name.toLowerCase().includes(searchInput.toLowerCase()))
              // .filter(recipe => recipe.Tags.some(tag => tag.tagname === recipe.Tags))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(recipe => {
                return <RecipeCard key={`user-recipe-${recipe.id}`} recipe={recipe} />
              })}
          </ul>
        </div>
        <div className="section-container">
          <div onClick={toggleDrawer} className="drawer-container">
            <h3>Recherche</h3>
            <img
              alt="reveal categories"
              src={chevron}
              className={isExpended ? 'recipe-tags-arrow' : 'recipe-tags-arrow rotated'}
            />
          </div>
          <div className={isExpended ? 'collapsible' : 'collapsible retracted'}>
            <div className="search-tag-container">
              <img src={searchIcon} className="search-tag" alt="search by tag" />
              <input
                type="search"
                className="recipies-search-tag"
                placeholder="recherche par tag"
              />
            </div>
            <ul className="taglist"></ul>
          </div>
        </div>
        <Link className="marginAuto" to={{ pathname: '/recipes/new' }}>
          <svg
            className="add-element-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="#fff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </Link>

        {/* <Searchbox
          scrollableRef={scrollableRef}
          handleResetSearchInput={handleResetSearchInput}
          handleSearchInput={handleSearchInput}
          parentName={'recipes'}
          placeholder={'recherche par nom'}
        /> */}
      </div>
    </>
  )
}
