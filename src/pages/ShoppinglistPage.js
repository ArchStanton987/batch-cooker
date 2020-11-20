import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Search from '../components/forms/Search'
import CTAButton from '../components/page_layout/CTAButton'
import Section from '../components/page_layout/Section'
import SectionCTA from '../components/page_layout/SectionCTA'
import Modal from '../components/wrappers/Modal'
import IngredientForm from '../components/forms/IngredientForm'
import trashIcon from '../assets/icons/trash.svg'
import plusIcon from '../assets/icons/plus.svg'
import circlePlusIcon from '../assets/icons/circle-plus-sec.svg'
import Ingredient from '../components/presentational/Ingredient'
import {
  fetchUserShoppingList,
  deleteIngredientFromShoppingList,
  addIngredientToShoppingList,
  updateIngredientFromShoppingList,
  clearUserShoppingList
} from '../lib/api/api-shoppinglist'
import { parseFetchedIngredients } from '../lib/utils/ingredients-utils'
import { addIngredientToInventory } from '../lib/api/api-inventory'
import SectionInfo from '../components/page_layout/SectionInfo'

export default function ShoppinglistPage(props) {
  const { userId } = props

  const [shoppingList, setShoppingList] = useState([])
  const [newIngredient, setNewIngredient] = useState(null)
  const [isIngredientModalActive, setIngredientModal] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [prompt, setPrompt] = useState({ visible: false, message: '', action: '' })

  const handleSearchInput = e => {
    setSearchInput(e.currentTarget.value)
  }
  const handleNewIngredient = e => {
    setNewIngredient({
      ...newIngredient,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handlePrompt = (bool, message, action) => {
    setPrompt({ visible: bool, message: message, action: action })
  }

  const toggleModal = () => {
    setIngredientModal(prevState => !prevState)
    isIngredientModalActive && setNewIngredient(null)
  }

  const handleDeleteIngredient = async id => {
    try {
      await deleteIngredientFromShoppingList(id, userId)
      handleFetchShoppingList()
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }

  const handleEditIngredient = id => {
    let ingredientData = shoppingList.filter(ingredient => ingredient.ingredientId === id)
    setNewIngredient(ingredientData[0])
    toggleModal()
  }

  const handleAddToShoppingList = async newIng => {
    try {
      await addIngredientToShoppingList(newIng, userId)
      toggleModal()
      handleFetchShoppingList()
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }
  const handleUpdateFromShoppingList = async newIng => {
    try {
      await updateIngredientFromShoppingList(newIng, userId)
      toggleModal()
      handleFetchShoppingList()
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
      }
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
    isUpdating ? handleUpdateFromShoppingList(newIng) : handleAddToShoppingList(newIng)
  }

  const handleclearUserShoppingList = async () => {
    try {
      await clearUserShoppingList(userId)
      handleFetchShoppingList()
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.message)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }

  const handleUpdateInventory = async () => {
    let ingredientsToAdd = shoppingList.filter(item => item.quantity > 0)
    ingredientsToAdd.forEach(item => (item.ingredientName = item.name))
    try {
      for (let i = 0; i < ingredientsToAdd.length; i++) {
        await addIngredientToInventory(ingredientsToAdd[i], userId)
      }
      handlePrompt(true, 'Inventaire mis à jour', 'UPDATED')
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.message)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }

  const handleFetchShoppingList = useCallback(async () => {
    try {
      const results = await fetchUserShoppingList(userId)
      const parsedResult = parseFetchedIngredients(results.data)
      setShoppingList(parsedResult)
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.message)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }, [userId])

  useEffect(() => {
    handleFetchShoppingList()
  }, [handleFetchShoppingList])

  return (
    <>
      <div className="page">
        {prompt.visible && (
          <Modal>
            {prompt.message}
            {prompt.action === 'UPDATED' && (
              <SectionInfo className={'no-border'}>
                <Link to="/inventory">
                  <CTAButton action={() => handlePrompt(false, '', '')}>OK</CTAButton>
                </Link>
              </SectionInfo>
            )}
            <SectionCTA className={'no-border'}>
              {prompt.action === 'EMPTYLIST' && (
                <>
                  <CTAButton action={() => handlePrompt(false, '')} className={'secondary'}>
                    Annuler
                  </CTAButton>
                  <CTAButton
                    action={() => {
                      handleclearUserShoppingList()
                      handlePrompt(false, '', '')
                    }}
                  >
                    Vider la liste
                  </CTAButton>
                </>
              )}
              {prompt.action === 'ADDINVENTORY' && (
                <>
                  <CTAButton action={() => handlePrompt(false, '')} className={'secondary'}>
                    Annuler
                  </CTAButton>
                  <CTAButton
                    action={() => {
                      handleUpdateInventory()
                      handleclearUserShoppingList()
                      handlePrompt(false, '', '')
                    }}
                  >
                    Ajouter à l'inventaire
                  </CTAButton>
                </>
              )}
            </SectionCTA>
          </Modal>
        )}
        {isIngredientModalActive && (
          <Modal
            title="Ajouter / modifier un ingrédient"
            handleClose={toggleModal}
            parent="shoppinglist"
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
        <h2>Liste de courses</h2>
        <SectionCTA className={'no-border'}>
          <Search
            value={searchInput}
            className={''}
            isSearchboxActive={true}
            parent={'shoppinglist'}
            handleSearchInput={handleSearchInput}
          />
          <CTAButton
            action={() =>
              handlePrompt(true, 'Êtes vous sûr de vouloir vider la liste ?', 'EMPTYLIST')
            }
            className={'secondary'}
          >
            <img className="icon cta-button--icon" src={trashIcon} alt="vider la liste" />
            Vider la liste
          </CTAButton>
          <CTAButton
            action={() =>
              handlePrompt(
                true,
                "Êtes vous sûr de vouloir tout ajouter à l'inventaire ? Ceci va également vider la liste de courses.",
                'ADDINVENTORY'
              )
            }
          >
            <img
              className="icon cta-button--icon"
              src={circlePlusIcon}
              alt="tout ajouter à l'inventaire"
            />
            Tout ajouter à l'inventaire
          </CTAButton>
          <CTAButton action={toggleModal}>
            <img className="icon cta-button--icon" src={plusIcon} alt="ajouter un ingrédient" />
            Ajouter un ingrédient
          </CTAButton>
        </SectionCTA>
        <Section className={'extended'}>
          <h3>Ma liste de courses</h3>
          <ul>
            {shoppingList &&
              shoppingList
                .filter(item => {
                  return item.name.toLowerCase().includes(searchInput.toLowerCase())
                })
                .filter(item => item.quantity > 0)
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
      </div>
    </>
  )
}
