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
import { parseFetchedIngredients, parseRecipesIngredients } from '../lib/utils/ingredients-utils'

export default function MenuPage(props) {
  const { userId } = props
  const [menuRecipes, setMenuRecipes] = useState([])
  const [isPrompt, setIsPrompt] = useState(false)
  const [promptMessage, setPromptMessage] = useState('')

  const handlePrompt = (bool, message) => {
    setIsPrompt(bool)
    setPromptMessage(message)
  }

  const handleFetchAllIngredients = async userId => {
    let res = await Promise.all([
      fetchUserShoppingList(userId),
      fetchUserInventory(userId),
      fetchMenuIngredients(userId)
    ])
    return res
  }

  const handleAddMenuToShoppinglist = async () => {
    try {
      let allIngredients = await handleFetchAllIngredients(userId)
      let entries = await getShoppingListEntries(allIngredients, userId)
      let res = await addMenuIngredientsToShoppinglist(entries, userId)
      handlePrompt(true, res.data.message)
    } catch (err) {
      handlePrompt(true, 'Erreur')
    }
  }

  const getIngredientsSet = ingredients => {
    let ingredientsSet = new Set()
    ingredients.forEach(ingredient => {
      ingredientsSet.add(`ingId${ingredient.ingredientId}`)
    })
    return ingredientsSet
  }

  const getIngredientsObject = (ingredientsSet, ingredients) => {
    let ingredientsObject = {}
    ingredientsSet.forEach(ingredient => {
      ingredientsObject[ingredient] = { quantity: 0, unit: '' }
    })
    ingredients.forEach(ingredient => {
      let key = `ingId${ingredient.ingredientId}`
      ingredientsObject[key].ingredientId = ingredient.ingredientId
      ingredientsObject[key].quantity = ingredient.quantity
    })
    return ingredientsObject
  }

  const getShoppingListEntries = async (allIngredients, userId) => {
    let shopIngredients = allIngredients[0].data
    let inventoryIngredients = parseFetchedIngredients(allIngredients[1].data)
    let menuIngredients = parseRecipesIngredients(allIngredients[2].data)

    let shopIngredientsSet = getIngredientsSet(shopIngredients)
    let inventoryIngredientsSet = getIngredientsSet(inventoryIngredients)
    let neededIngredientsSet = getIngredientsSet(menuIngredients)

    let shopIngredientsObject = getIngredientsObject(shopIngredientsSet, shopIngredients)
    let inventoryIngredientsObject = getIngredientsObject(
      inventoryIngredientsSet,
      inventoryIngredients
    )
    let neededIngredientsObject = getIngredientsObject(neededIngredientsSet, menuIngredients)

    for (let key in neededIngredientsObject) {
      neededIngredientsObject[key].userId = userId
      let isInShoppingList = shopIngredientsSet.has(key)
      let isInInventory = inventoryIngredientsSet.has(key)
      if (isInShoppingList) {
        neededIngredientsObject[key].quantity += shopIngredientsObject[key].quantity
      }
      if (isInInventory) {
        neededIngredientsObject[key].quantity -= inventoryIngredientsObject[key].quantity
      }
      if (neededIngredientsObject[key].quantity <= 0) {
        delete neededIngredientsObject[key]
      }
    }
    let newShoppingListEntries = Object.values(neededIngredientsObject)
    return newShoppingListEntries
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
        <SectionCTA className={'desktop-only no-border'}>
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
