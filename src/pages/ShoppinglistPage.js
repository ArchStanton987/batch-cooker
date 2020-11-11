import React, { useCallback, useEffect, useState } from 'react'
import Search from '../components/forms/Search'
import CTAButton from '../components/page_layout/CTAButton'
import Section from '../components/page_layout/Section'
import SectionCTA from '../components/page_layout/SectionCTA'
import Modal from '../components/wrappers/Modal'
import IngredientForm from '../components/forms/IngredientForm'
import trashIcon from '../assets/icons/trash.svg'
import plusIcon from '../assets/icons/plus.svg'
import Ingredient from '../components/presentational/Ingredient'
import {
  fetchUserShoppingList,
  deleteIngredientFromShoppingList,
  addIngredientToShoppingList,
  updateIngredientFromShoppingList,
  clearUserShoppingList
} from '../lib/api/api-shoppinglist'
import { parseFetchedIngredients } from '../lib/utils/ingredients-utils'

export default function ShoppinglistPage(props) {
  const { userId } = props

  const [shoppingList, setShoppingList] = useState([])
  const [newIngredient, setNewIngredient] = useState(null)
  const [isIngredientModalActive, setIngredientModal] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [isPrompt, setIsPrompt] = useState(false)
  const [promptMessage, setPromptMessage] = useState('')

  const handleSearchInput = e => {
    setSearchInput(e.currentTarget.value)
  }
  const handleNewIngredient = e => {
    setNewIngredient({
      ...newIngredient,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handlePrompt = (bool, message) => {
    setIsPrompt(bool)
    setPromptMessage(message)
  }

  const toggleModal = () => {
    setIngredientModal(prevState => !prevState)
    isIngredientModalActive && setNewIngredient(null)
  }

  const handleDeleteIngredient = async id => {
    setIsPrompt(false, '')
    try {
      await deleteIngredientFromShoppingList(id, userId)
      handleFetchShoppingList()
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      }
    }
  }

  const handleEditIngredient = id => {
    let ingredientData = shoppingList.filter(ingredient => ingredient.ingredientId === id)
    setNewIngredient(ingredientData[0])
    toggleModal()
  }

  const handleAddToShoppingList = async newIng => {
    handlePrompt(false, '')
    try {
      await addIngredientToShoppingList(newIng, userId)
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
  const handleUpdateFromShoppingList = async newIng => {
    handlePrompt(false, '')
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
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
      }
    }
  }, [userId])

  useEffect(() => {
    handleFetchShoppingList()
  }, [handleFetchShoppingList])

  return (
    <>
      <div className="page">
        {isPrompt && (
          <Modal>
            {promptMessage}
            <SectionCTA className={'no-border'}>
              <CTAButton action={() => handlePrompt(false, '')} className={'secondary'}>
                Annuler
              </CTAButton>
              <CTAButton
                action={() => {
                  handleclearUserShoppingList()
                  handlePrompt(false, '')
                }}
              >
                Vider la liste
              </CTAButton>
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
            className={''}
            isSearchboxActive={true}
            parent={'shoppinglist'}
            handleSearchInput={handleSearchInput}
          />
          <CTAButton
            action={() => handlePrompt(true, 'Êtes vous sûr de vouloir vider la liste ?')}
            className={'secondary'}
          >
            <img className="icon cta-button--icon" src={trashIcon} alt="vider la liste" />
            Vider la liste
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
