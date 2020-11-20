import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'

import { fetchRandomRecipes, fetchSearchResults } from '../lib/api/api-recipes'
import Section from '../components/page_layout/Section'
import Modal from '../components/wrappers/Modal'
import SectionInfo from '../components/page_layout/SectionInfo'
import CTAButton from '../components/page_layout/CTAButton'
import SectionCTA from '../components/page_layout/SectionCTA'
import RecipeCard from '../components/presentational/RecipeCard'
import Search from '../components/forms/Search'
import { parseRecipeSaves } from '../lib/utils/recipes-utils'
import plusIcon from '../assets/icons/plus.svg'
import ChevronIcon from '../components/page_layout/ChevronIcon'

export default function HomePage() {
  const [recipes, setRecipes] = useState([])
  const [searchedRecipes, setSearchedRecipes] = useState([])
  const [prompt, setPrompt] = useState({ visible: false, message: '' })
  const [isExpended, setDrawer] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [isSearchActive, setSearchActive] = useState(false)

  const handlePrompt = (bool, message) => {
    setPrompt({ visible: bool, message: message })
  }

  const toggleDrawer = () => setDrawer(prevState => !prevState)

  const debouncedFetch = useCallback(
    debounce(nextValue => handleFetchSearchResults(nextValue), 1000),
    []
  )
  const debouncedSearchActive = useCallback(debounce(bool => setSearchActive(bool), 1000))

  const handleSearchInput = e => {
    const { value: nextValue } = e.target
    if (!nextValue) {
      setSearchActive(false)
      setSearchInput('')
      return
    }
    setSearchInput(() => {
      if (nextValue.length <= 2) {
        return nextValue
      }
      if (nextValue.length > 2) {
        debouncedFetch(nextValue)
        debouncedSearchActive(true)
        return nextValue
      }
    })
  }

  const handleFetchSearchResults = async searchInput => {
    try {
      let res = await fetchSearchResults(searchInput)
      let parsed = await parseRecipeSaves(res)
      setSearchedRecipes(parsed)
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
      }
      console.log(err)
    }
  }

  const handleFetchRandomRecipes = useCallback(async () => {
    try {
      let res = await fetchRandomRecipes()
      let parsed = await parseRecipeSaves(res)
      setRecipes(parsed)
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
      }
    }
  }, [])

  useEffect(() => {
    handleFetchRandomRecipes()
  }, [handleFetchRandomRecipes])

  return (
    <>
      <div className="page">
        {prompt.visible && (
          <Modal>
            {prompt.message}
            <SectionInfo className={'no-border'}>
              <CTAButton action={() => handlePrompt(false, '')}>OK</CTAButton>
            </SectionInfo>
          </Modal>
        )}
        <h2>Accueil</h2>
        <SectionCTA className={'desktop-only no-border'}>
          <Search
            value={searchInput}
            className={''}
            handleSearchInput={handleSearchInput}
            isSearchboxActive={true}
          />
          <Link to={{ pathname: '/myrecipes/new' }}>
            <CTAButton className={'add-recipe'}>
              <img className="icon cta-button--icon" src={plusIcon} alt="add new recipe" />
              Créer
            </CTAButton>
          </Link>
        </SectionCTA>
        {!isSearchActive && (
          <Section className={'extended'}>
            <h3>Recettes au hasard</h3>
            <ul className="recipe-card-list">
              {recipes &&
                recipes.map(recipe => {
                  return <RecipeCard key={`recipe-${recipe.id}`} recipe={recipe} />
                })}
            </ul>
          </Section>
        )}
        {isSearchActive && (
          <Section className={'extended'}>
            <h3>Résultats</h3>
            <ul className="recipe-card-list">
              {searchedRecipes &&
                searchedRecipes.map(recipe => {
                  return <RecipeCard key={`recipe-${recipe.id}`} recipe={recipe} />
                })}
            </ul>
          </Section>
        )}
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
          <Link className="marginAuto" to={{ pathname: '/myrecipes/new' }}>
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
