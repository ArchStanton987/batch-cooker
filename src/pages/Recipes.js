import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import Section from '../components/Section'
import RecipeCard from '../containers/RecipeCard'
import ChevronIcon from '../components/ChevronIcon'
import { fecthRecipies, parseFetchedRecipes } from '../lib/recipies'
import '../sass/pages/_Recipes.scss'
import '../sass/pages/_FullRecipe.scss'
import Search from '../components/Search'

export default function Recipes() {
  // const defaultTagFilter = { tagname: '' }

  const [userRecipes, setUserRecipes] = useState([])
  const [searchInput, setSearchInput] = useState('')
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

  useEffect(() => {
    handleFetchRecipes()
  }, [])

  return (
    <>
      <div className="page">
        <h2>Mes recettes</h2>
        <Section className={'extended'}>
          <h3 ref={scrollableRef}>Liste</h3>
          <ul className="recipes-list">
            {userRecipes
              .filter(recipe => recipe.name.toLowerCase().includes(searchInput.toLowerCase()))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(recipe => {
                return <RecipeCard key={`user-recipe-${recipe.id}`} recipe={recipe} />
              })}
          </ul>
        </Section>
        <Section className={''}>
          <div onClick={toggleDrawer} className="drawer-container">
            <h3>Recherche</h3>
            <ChevronIcon isExpended={isExpended} />
          </div>
          <div className={isExpended ? 'recipes--search-drawer' : 'recipes--search-drawer retracted'}>
            <Search
              className={"justifyCenter"}
              parent="recipes"
              handleSearchInput={handleSearchInput}
              scrollableRef={scrollableRef}
              isSearchboxActive={true}
              placeholder="ex: blanquette de veau"
            />
          </div>
        </Section>
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
      </div>
    </>
  )
}
