import React, { useCallback, useEffect, useState } from 'react'

import {
  addIngredientToInventory,
  deleteIngredientFromInventory,
  fetchUserInventory,
  parseFetchedInventory,
  updateIngredientFromInventory
} from '../lib/inventory'
import { ingredientCategories } from '../lib/ingredientCategories'
import Ingredient from '../containers/Ingredient'
import '../sass/pages/_Inventory.scss'
import IngredientForm from '../containers/IngredientForm'
import Section from '../components/Section'
import ChevronIcon from '../components/ChevronIcon'
import plusIcon from '../assets/icons/plus.svg'
import Search from '../components/Search'
import SectionCTA from '../components/SectionCTA'
import CTAButton from '../components/CTAButton'
import Modal from '../components/Modal'
import { useToggle } from '../lib/hooks'

export default function InventoryPage(props) {
  const { userId } = props

  const [isExpended, setDrawer] = useToggle(false)
  const [isSearchboxActive, setSearchbox] = useToggle(false)
  const [isIngredientModalActive, setIngredientModal] = useState(false)
  const [activeCategories, setActiveCategories] = useState(ingredientCategories)
  const [inventory, setInventory] = useState([])
  const [newIngredient, setNewIngredient] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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

  const handleError = err => {
    setIsError(true)
    setErrorMessage(err.response.data.error)
  }
  const dismissError = () => {
    setIsError(false)
    setErrorMessage('')
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
    setIsError(false)
    try {
      const result = await fetchUserInventory(userId)
      const parsedResult = parseFetchedInventory(result.data)
      setInventory(parsedResult)
    } catch (err) {
      handleError(err)
    }
  }, [userId])
  const handleDeleteIngredient = async id => {
    setIsError(false)
    try {
      await deleteIngredientFromInventory(id, userId)
      handleFetchInventory(userId)
    } catch (err) {
      handleError(err)
    }
  }
  const handleAddToInventory = async newIng => {
    setIsError(false)
    try {
      await addIngredientToInventory(newIng, userId)
      toggleModal()
      handleFetchInventory(userId)
    } catch (err) {
      handleError(err)
    }
  }
  const handleUpdateFromInventory = async newIng => {
    setIsError(false)
    try {
      await updateIngredientFromInventory(newIng, userId)
      toggleModal()
      handleFetchInventory(userId)
    } catch (err) {
      handleError(err)
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
        {isError && (
          <Modal
            title="Erreur"
            handleClose={() => {
              dismissError()
            }}
            parent="ingredient"
          >
            {errorMessage}
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