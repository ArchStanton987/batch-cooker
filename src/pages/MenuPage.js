import React, { useCallback, useEffect, useState } from 'react'
import CTAButton from '../components/page_layout/CTAButton'
import Section from '../components/page_layout/Section'
import SectionCTA from '../components/page_layout/SectionCTA'
import SectionInfo from '../components/page_layout/SectionInfo'
import Modal from '../components/wrappers/Modal'
import trashIcon from '../assets/icons/trash.svg'
import plusIcon from '../assets/icons/plus.svg'
import MyRecipesCard from '../components/presentational/MyRecipesCard'
import { fetchMenu, clearMenu } from '../lib/api/api-menu'
import {
  fetchUserShoppingList,
  addMenuIngredientsToShoppinglist
} from '../lib/api/api-shoppinglist'
import { fetchUserInventory } from '../lib/api/api-inventory'
import { fetchMenuIngredients } from '../lib/api/api-menu'
import { parseFetchedPartialRecipes } from '../lib/utils/recipes-utils'
import { getShoppingListEntries } from '../lib/utils/ingredients-utils'

export default function MenuPage(props) {
  const { UserId } = props
  const [menuRecipes, setMenuRecipes] = useState([])
  const [isPrompt, setIsPrompt] = useState(false)
  const [promptMessage, setPromptMessage] = useState('')

  const handlePrompt = (bool, message) => {
    setIsPrompt(bool)
    setPromptMessage(message)
  }

  const handleFetchAllIngredients = async UserId => {
    let res = await Promise.all([
      fetchUserShoppingList(UserId),
      fetchUserInventory(UserId),
      fetchMenuIngredients(UserId)
    ])
    return res
  }

  const handleAddMenuToShoppinglist = async () => {
    try {
      let allIngredients = await handleFetchAllIngredients(UserId)
      let entries = await getShoppingListEntries(allIngredients, UserId)
      let res = await addMenuIngredientsToShoppinglist(entries, UserId)
      handlePrompt(true, res.data.message)
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }

  const handleFetchMenu = useCallback(async () => {
    try {
      const results = await fetchMenu(UserId)
      let parsedResults = parseFetchedPartialRecipes(results.data)
      setMenuRecipes(parsedResults)
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }, [UserId])

  const handleClearMenu = async () => {
    try {
      let res = await clearMenu(UserId)
      handlePrompt(true, res.data.message)
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
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
                  handlePrompt(false, '')
                  handleFetchMenu()
                }}
              >
                OK
              </CTAButton>
            </SectionInfo>
          </Modal>
        )}
        <h2>Menu</h2>
        <SectionCTA className={'no-border'}>
          <CTAButton action={handleClearMenu} className={'secondary'}>
            <img className="icon cta-button--icon" src={trashIcon} alt="Tout supprimer" />
            Vider le menu
          </CTAButton>
          <CTAButton action={handleAddMenuToShoppinglist}>
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
