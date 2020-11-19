import React, { useCallback, useEffect, useState } from 'react'
import 'pure-react-carousel/dist/react-carousel.es.css'

import { fetchRandomRecipes } from '../lib/api/api-recipes'
import Section from '../components/page_layout/Section'
import Modal from '../components/wrappers/Modal'
import SectionInfo from '../components/page_layout/SectionInfo'
import CTAButton from '../components/page_layout/CTAButton'
import RecipeCard from '../components/presentational/RecipeCard'
import { parseRecipeSaves } from '../lib/utils/recipes-utils'

export default function HomePage(props) {
  const [recipes, setRecipes] = useState([])
  const [prompt, setPrompt] = useState({ visible: false, message: '' })

  const handlePrompt = (bool, message) => {
    setPrompt({ visible: bool, message: message })
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
        <Section>
          <h3>Page en construction</h3>
        </Section>
        <Section>
          <h3>Recettes au hasard</h3>
          <ul className='recipe-card-list'>
            {recipes &&
              recipes.map(recipe => {
                return <RecipeCard key={`recipe-${recipe.id}`} recipe={recipe} />
              })}
          </ul>
        </Section>
      </div>
    </>
  )
}
