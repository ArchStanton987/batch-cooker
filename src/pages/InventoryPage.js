import React, { useCallback, useEffect, useState } from 'react'

import { parseFetchedIngredients } from '../lib/utils/ingredients-utils'
import {
  addIngredientToInventory,
  deleteIngredientFromInventory,
  fetchUserInventory,
  updateIngredientFromInventory
} from '../lib/api/api-inventory'
import { ingredientCategories } from '../lib/ingredientCategories'
import { useToggle } from '../lib/hooks'

import plusIcon from '../assets/icons/plus.svg'
import Ingredient from '../components/presentational/Ingredient'
import IngredientForm from '../components/forms/IngredientForm'
import Section from '../components/page_layout/Section'
import SectionCTA from '../components/page_layout/SectionCTA'
import CTAButton from '../components/page_layout/CTAButton'
import ChevronIcon from '../components/page_layout/ChevronIcon'
import Search from '../components/forms/Search'
import Modal from '../components/wrappers/Modal'

import '../sass/pages/_Inventory.scss'

export default function InventoryPage(props) {
  const { userId } = props

  const [isExpended, setDrawer] = useToggle(false)
  const [isSearchboxActive, setSearchbox] = useToggle(false)
  const [isIngredientModalActive, setIngredientModal] = useState(false)
  const [activeCategories, setActiveCategories] = useState(ingredientCategories)
  const [inventory, setInventory] = useState([])
  const [newIngredient, setNewIngredient] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [isPrompt, setIsPrompt] = useState(false)
  const [promptMessage, setPromptMessage] = useState('')

  let categories = Object.entries(activeCategories)

  const toggleModal = () => {
    setIngredientModal(prevState => !prevState)
    isIngredientModalActive && setNewIngredient(null)
  }
  const toggleCategoryFilter = e => {
    let categoryName = e.target.name
    activeCategories[categoryName].active = !activeCategories[categoryName].active
    let updatedValues = activeCategories.categoryName
    setActiveCategories(prevState => {
      return { ...prevState, ...updatedValues }
    })
  }

  const handlePrompt = (bool, message) => {
    setIsPrompt(bool)
    setPromptMessage(message)
  }

  const handleNewIngredient = e => {
    setNewIngredient({
      ...newIngredient,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  const handleSearchInput = e => {
    setSearchInput(e.currentTarget.value)
  }
  const handleEditIngredient = id => {
    let ingredientData = inventory.filter(ingredient => ingredient.ingredientId === id)
    setNewIngredient(ingredientData[0])
    toggleModal()
  }

  const handleFetchInventory = useCallback(async () => {
    handlePrompt(false, '')
    try {
      const result = await fetchUserInventory(userId)
      const parsedResult = parseFetchedIngredients(result.data)
      setInventory(parsedResult)
    } catch (err) {
      handlePrompt(true, err)
    }
  }, [userId])
  const handleDeleteIngredient = async id => {
    handlePrompt(false, '')
    try {
      await deleteIngredientFromInventory(id, userId)
      handleFetchInventory(userId)
    } catch (err) {
      handlePrompt(true, err)
    }
  }
  const handleAddToInventory = async newIng => {
    handlePrompt(false, '')
    try {
      await addIngredientToInventory(newIng, userId)
      toggleModal()
      handleFetchInventory(userId)
    } catch (err) {
      handlePrompt(true, err)
    }
  }
  const handleUpdateFromInventory = async newIng => {
    setIsPrompt(false, '')
    try {
      await updateIngredientFromInventory(newIng, userId)
      toggleModal()
      handleFetchInventory(userId)
    } catch (err) {
      handlePrompt(true, err)
    }
  }
  const handleSubmitIngredient = (e, isUpdating) => {
    e.preventDefault()
    const newIng = {
      ingredientId: newIngredient.ingredientId || null,
      ingredientName: newIngredient.name,
      category: newIngredient.category,
      quantity: newIngredient.quantity,
      unity: newIngredient.unity
    }
    isUpdating ? handleUpdateFromInventory(newIng) : handleAddToInventory(newIng)
  }

  useEffect(() => {
    handleFetchInventory()
  }, [handleFetchInventory])

  return (
    <>
      <div className="page">
        {isPrompt && (
          <Modal
            title="Erreur"
            handleClose={() => {
              handlePrompt(false, '')
            }}
            parent="ingredient"
          >
            {promptMessage}
          </Modal>
        )}
        {isIngredientModalActive && (
          <Modal
            title="Ajouter / modifier un ingrédient"
            handleClose={toggleModal}
            parent="ingredient"
          >
            <IngredientForm
              handleSubmitIngredient={handleSubmitIngredient}
              handleNewIngredient={handleNewIngredient}
              toggleModal={toggleModal}
              name={newIngredient ? newIngredient.name : ''}
              category={newIngredient ? newIngredient.category : ''}
              ingredientId={newIngredient ? newIngredient.ingredientId : ''}
              quantity={newIngredient ? newIngredient.quantity : ''}
              unity={newIngredient ? newIngredient.unity : ''}
            />
          </Modal>
        )}
        <h2>Inventaire</h2>
        <SectionCTA className={'no-border desktop-only'}>
          <Search
            isSearchboxActive={true}
            parent={'inventory'}
            handleSearchInput={handleSearchInput}
            placeholder={'poivre, moutarde, etc.'}
          />
          <CTAButton action={toggleModal}>
            <img className="icon cta-button--icon" src={plusIcon} alt="add to inventory" />
            Ajouter
          </CTAButton>
        </SectionCTA>
        <Section className={''}>
          <div onClick={setDrawer} className="drawer-container">
            <h3>Catégories</h3>
            <ChevronIcon isExpended={isExpended} />
          </div>
          <ul
            className={
              isExpended ? 'inventory-category--list' : 'inventory-category--list retracted'
            }
          >
            {categories.map(category => {
              return (
                <li key={`category-${category[0]}`}>
                  <button
                    name={category[0]}
                    onClick={toggleCategoryFilter}
                    className={!category[1].active ? 'secondary' : ''}
                  >
                    {category[1].fullname}
                  </button>
                </li>
              )
            })}
          </ul>
        </Section>
        <Section className={'extended'}>
          <h3>Ingrédients</h3>
          <ul className="inventory-ingredients--list">
            {inventory &&
              inventory
                .filter(item => {
                  return item.name.toLowerCase().includes(searchInput.toLowerCase())
                })
                .filter(item => {
                  const keys = Object.keys(activeCategories)
                  let match = keys.some(key => {
                    return (
                      activeCategories[key].fullname === item.category &&
                      activeCategories[key].active &&
                      true
                    )
                  })
                  return match
                })
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(item =>
                  React.Children.toArray(
                    <Ingredient
                      handleEditIngredient={handleEditIngredient}
                      handleDeleteIngredient={handleDeleteIngredient}
                      key={item.ingredientId}
                      name={item.name}
                      quantity={item.quantity}
                      ingredientId={item.ingredientId}
                      unity={item.unity}
                    />
                  )
                )}
          </ul>
        </Section>
        <SectionCTA className={'mobile-only no-border'}>
          <Search
            parent={'inventory'}
            handleSearchInput={handleSearchInput}
            isSearchboxActive={isSearchboxActive}
            toggleSearchbox={setSearchbox}
          />
          <CTAButton action={toggleModal}>
            <img className="icon cta-button--icon" src={plusIcon} alt="add to inventory" />
            Ajouter
          </CTAButton>
        </SectionCTA>
      </div>
    </>
  )
}
