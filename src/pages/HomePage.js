import React, { useCallback, useEffect, useState } from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import { fetchRandomRecipes } from '../lib/api/api-recipes'
import Section from '../components/page_layout/Section'
import Modal from '../components/wrappers/Modal'
import SectionInfo from '../components/page_layout/SectionInfo'
import CTAButton from '../components/page_layout/CTAButton'
import RecipeCard from '../components/presentational/RecipeCard'
import chevronRight from '../assets/icons/chevron-right.svg'
import chevronLeft from '../assets/icons/chevron-left.svg'
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
        <CarouselProvider
          step={2}
          dragStep={2}
          visibleSlides={3.25}
          naturalSlideHeight={200}
          naturalSlideWidth={140}
          totalSlides={recipes && recipes.length}
          className="recipes-carousel"
          isIntrinsicHeight={true}
        >
          <Section>
            <div className="drawer-container">
              <h3>Recettes au hasard</h3>
              <div className="buttons-container">
                <ButtonBack className="carousel-button">
                  <img className="carousel-icon" src={chevronLeft} alt="suivant" />
                </ButtonBack>
                <ButtonNext className="carousel-button">
                  <img className="carousel-icon" src={chevronRight} alt="précédent" />
                </ButtonNext>
              </div>
            </div>
            <Slider className="carousel-slider">
              {recipes &&
                recipes.map(recipe => {
                  return (
                    <Slide key={`recipe-${recipe.id}`} index={recipe.id}>
                      <RecipeCard key={`recipe-${recipe.id}`} recipe={recipe} />
                    </Slide>
                  )
                })}
            </Slider>
          </Section>
        </CarouselProvider>
      </div>
    </>
  )
}
