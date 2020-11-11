import React, { useCallback, useEffect, useState } from 'react'
import CTAButton from '../components/page_layout/CTAButton'
import Section from '../components/page_layout/Section'
import SectionCTA from '../components/page_layout/SectionCTA'
import Modal from '../components/wrappers/Modal'
import trashIcon from '../assets/icons/trash.svg'
import plusIcon from '../assets/icons/plus.svg'
import MyRecipesCard from '../components/presentational/MyRecipesCard'
import { fetchMenu, clearMenu } from '../lib/api/api-menu'
import { parseFetchedPartialRecipes } from '../lib/utils/recipes-utils'
import SectionInfo from '../components/page_layout/SectionInfo'

export default function MenuPage(props) {
  const { userId } = props
  const [menuRecipes, setMenuRecipes] = useState([])
  const [isPrompt, setIsPrompt] = useState(false)
  const [promptMessage, setPromptMessage] = useState('')

  const resetDefaultPrompt = () => {
    setIsPrompt(false)
    setPromptMessage('')
  }

  const handleFetchMenu = useCallback(async () => {
    try {
      const results = await fetchMenu(userId)
      let parsedResults = parseFetchedPartialRecipes(results.data)
      setMenuRecipes(parsedResults)
    } catch (err) {
      if (err.response) {
        setIsPrompt(true)
        setPromptMessage(err.response.data.error)
      } else {
        setIsPrompt(true)
        setPromptMessage('Erreur')
        console.log(err)
      }
    }
  }, [userId])

  const handleClearMenu = async () => {
    try {
      let res = await clearMenu(userId)
      setIsPrompt(true)
      setPromptMessage(res.data.message)
    } catch (err) {
      if (err.response) {
        setIsPrompt(true)
        setPromptMessage(err.response.data.error)
      } else {
        setIsPrompt(true)
        setPromptMessage('Erreur')
        console.log(err)
      }
    }
  }

  useEffect(() => {
    handleFetchMenu()
  }, [handleFetchMenu])

  return (
    <>
      <div className="page">
        {isPrompt && (
          <Modal parent="menu">
            <Section className={'no-border'}>{promptMessage}</Section>
            <SectionInfo className={'no-border'}>
              <CTAButton
                action={() => {
                  resetDefaultPrompt()
                  handleFetchMenu()
                }}
              >
                OK
              </CTAButton>
            </SectionInfo>
          </Modal>
        )}
        <h2>Menu</h2>
        <SectionCTA className={'desktop-only no-border'}>
          <CTAButton action={handleClearMenu} className={'secondary'}>
            <img className="icon cta-button--icon" src={trashIcon} alt="Tout supprimer" />
            Vider le menu
          </CTAButton>
          <CTAButton>
            <img
              className="icon cta-button--icon"
              src={plusIcon}
              alt="Tout ajouter à la liste de courses"
            />
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
