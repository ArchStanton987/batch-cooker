import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

import '../sass/pages/_Recipes.scss'
import '../sass/pages/_FullRecipe.scss'
import { fetchSavedRecipes } from '../lib/api/api-recipes'
import { parseFetchedSavedRecipes } from '../lib/utils/recipes-utils'
import plusIcon from '../assets/icons/plus.svg'
import MyRecipesCard from '../components/presentational/MyRecipesCard'
import Search from '../components/forms/Search'
import Section from '../components/page_layout/Section'
import ChevronIcon from '../components/page_layout/ChevronIcon'
import SectionCTA from '../components/page_layout/SectionCTA'
import CTAButton from '../components/page_layout/CTAButton'
import Modal from '../components/wrappers/Modal'

export default function MyRecipesPage(props) {
  const { userId } = props

  const [userRecipes, setUserRecipes] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [isExpended, setDrawer] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const toggleDrawer = () => setDrawer(prevState => !prevState)

  const handleFetchSavedRecipes = useCallback(async () => {
    try {
      const results = await fetchSavedRecipes(userId)
      let parsedResults = parseFetchedSavedRecipes(results.data)
      setUserRecipes(parsedResults)
    } catch (err) {
      if (err.response) {
        setIsError(true)
        setErrorMessage(err.response.data.error)
      } else {
        setIsError(true)
        setErrorMessage(err)
        console.log(err)
      }
    }
  }, [userId])

  const handleSearchInput = e => {
    setSearchInput(e.currentTarget.value)
  }

  useEffect(() => {
    handleFetchSavedRecipes()
  }, [handleFetchSavedRecipes])

  return (
    <>
      <div className="page">
        {isError && (
          <Modal
            title="Erreur"
            handleClose={() => {
              setIsError(false)
              setErrorMessage('')
            }}
            parent="ingredient"
          >
            {errorMessage}
          </Modal>
        )}
        <h2>Mes recettes</h2>
        <SectionCTA className={'desktop-only no-border'}>
          <Search className={''} handleSearchInput={handleSearchInput} isSearchboxActive={true} />
          <Link to={{ pathname: '/myrecipes/new' }}>
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
