import React, { useCallback, useEffect, useState } from 'react'
import CTAButton from '../components/page_layout/CTAButton'
import Section from '../components/page_layout/Section'
import SectionCTA from '../components/page_layout/SectionCTA'
import Modal from '../components/wrappers/Modal'
import trashIcon from '../assets/icons/trash.svg'
import plusIcon from '../assets/icons/plus.svg'
import MyRecipesCard from '../components/presentational/MyRecipesCard'
import { fetchMenu } from '../lib/api/api-menu'
import { parseFetchedPartialRecipes } from '../lib/utils/recipes-utils'

export default function MenuPage(props) {
  const { userId } = props
  const [menuRecipes, setMenuRecipes] = useState([])
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFetchMenu = useCallback(async () => {
    try {
      const results = await fetchMenu(userId)
      
      let parsedResults = parseFetchedPartialRecipes(results.data)
      
      setMenuRecipes(parsedResults)
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

  useEffect(() => {
    handleFetchMenu()
  }, [handleFetchMenu])

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
        <h2>Menu</h2>
        <SectionCTA className={'desktop-only no-border'}>
          <CTAButton className={'secondary'}>
            <img className="icon cta-button--icon" src={trashIcon} alt="Tout supprimer" />
            Tout supprimer
          </CTAButton>
          <CTAButton>
            <img className="icon cta-button--icon" src={plusIcon} alt="Tout supprimer" />
            Tout ajouter à la liste de course
          </CTAButton>
        </SectionCTA>
        <Section className={'extended'}>
          <h3>Recettes au menu</h3>
          <ul className="recipes-list">
            {menuRecipes &&
              menuRecipes
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(recipe => {
                  return <MyRecipesCard key={`user-recipe-${recipe.id}`} recipe={recipe} />
                })}
          </ul>
        </Section>
      </div>
    </>
  )
}
