import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Section from '../components/Section'
import MyRecipesCard from '../containers/MyRecipesCard'
import ChevronIcon from '../components/ChevronIcon'
import plusIcon from '../assets/icons/plus.svg'
import { fecthRecipes, parseFetchedRecipes } from '../lib/recipies'
import '../sass/pages/_Recipes.scss'
import '../sass/pages/_FullRecipe.scss'
import Search from '../components/Search'
import SectionCTA from '../components/SectionCTA'
import CTAButton from '../components/CTAButton'

export default function MyRecipes() {
  const [userRecipes, setUserRecipes] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [isExpended, setDrawer] = useState(false)

  const toggleDrawer = () => setDrawer(prevState => !prevState)

  const handleFetchRecipes = async () => {
    const results = await fecthRecipes()
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
        <SectionCTA className={'desktop-only no-border'}>
          <Search
            className={''}
            handleSearchInput={handleSearchInput}
            isSearchboxActive={true}
          />
          <Link to={{ pathname: '/recipes/new' }}>
            <CTAButton className={'add-recipe'}>
              <img className="icon cta-button--icon" src={plusIcon} alt="add new recipe" />
              Ajouter
            </CTAButton>
          </Link>
        </SectionCTA>
        <Section className={'extended'}>
          <h3>Liste</h3>
          <ul className="recipes-list">
            {userRecipes
              .filter(recipe => recipe.name.toLowerCase().includes(searchInput.toLowerCase()))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(recipe => {
                return <MyRecipesCard key={`user-recipe-${recipe.id}`} recipe={recipe} />
              })}
          </ul>
        </Section>
        <Section className={'mobile-only'}>
          <div onClick={toggleDrawer} className="drawer-container">
            <h3>Recherche</h3>
            <ChevronIcon isExpended={isExpended} />
          </div>
          <div
            className={isExpended ? 'recipes--search-drawer' : 'recipes--search-drawer retracted'}
          >
            <Search
              className={'justifyCenter'}
              parent="recipes"
              handleSearchInput={handleSearchInput}
              isSearchboxActive={true}
              placeholder="ex: blanquette de veau"
            />
          </div>
        </Section>
        <Section className={'mobile-only no-border'}>
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
        </Section>
      </div>
    </>
  )
}
