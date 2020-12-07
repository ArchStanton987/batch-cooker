import React, { useCallback, useEffect, useState } from 'react'

import { parseFetchedIngredients } from '../lib/utils/ingredients-utils'
import {
  addIngredientToInventory,
  deleteIngredientFromInventory,
  fetchUserInventory,
  updateIngredientFromInventory
} from '../lib/api/api-inventory'
import { useToggle } from '../lib/hooks'

import plusIcon from '../assets/icons/plus.svg'
import Ingredient from '../components/presentational/Ingredient'
import IngredientForm from '../components/forms/IngredientForm'
import Section from '../components/page_layout/Section'
import SectionCTA from '../components/page_layout/SectionCTA'
import CTAButton from '../components/page_layout/CTAButton'
import Search from '../components/forms/Search'
import Modal from '../components/wrappers/Modal'

import '../sass/pages/_Inventory.scss'

export default function InventoryPage(props) {
  const { UserId } = props

  const [isSearchboxActive, setSearchbox] = useToggle(false)
  const [isIngredientModalActive, setIngredientModal] = useState(false)
  const [inventory, setInventory] = useState([])
  const [newIngredient, setNewIngredient] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [isPrompt, setIsPrompt] = useState(false)
  const [promptMessage, setPromptMessage] = useState('')


  const toggleModal = () => {
    setIngredientModal(prevState => !prevState)
    isIngredientModalActive && setNewIngredient(null)
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
    let ingredientData = inventory.filter(ingredient => ingredient.IngredientId === id)
    setNewIngredient(ingredientData[0])
    toggleModal()
  }

  const handleFetchInventory = useCallback(async () => {
    handlePrompt(false, '')
    try {
      const result = await fetchUserInventory(UserId)
      const parsedResult = parseFetchedIngredients(result.data)
      setInventory(parsedResult)
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }, [UserId])
  const handleDeleteIngredient = async id => {
    handlePrompt(false, '')
    try {
      await deleteIngredientFromInventory(id, UserId)
      handleFetchInventory(UserId)
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }
  const handleAddToInventory = async newIng => {
    handlePrompt(false, '')
    try {
      await addIngredientToInventory(newIng, UserId)
      toggleModal()
      handleFetchInventory(UserId)
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }
  const handleUpdateFromInventory = async newIng => {
    setIsPrompt(false, '')
    try {
      await updateIngredientFromInventory(newIng, UserId)
      toggleModal()
      handleFetchInventory(UserId)
    } catch (err) {
      if (err.response) {
        handlePrompt(true, err.response.data.error)
      } else {
        handlePrompt(true, 'Erreur')
        console.log(err)
      }
    }
  }
  const handleSubmitIngredient = (e, isUpdating) => {
    e.preventDefault()
    const newIng = {
      IngredientId: newIngredient.IngredientId || null,
      ingredientName: newIngredient.name,
      quantity: newIngredient.quantity,
      unit: newIngredient.unit
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
              IngredientId={newIngredient ? newIngredient.IngredientId : ''}
              quantity={newIngredient ? newIngredient.quantity : ''}
              unit={newIngredient ? newIngredient.unit : ''}
            />
          </Modal>
        )}
        <h2>Inventaire</h2>
        <SectionCTA className={'no-border desktop-only'}>
          <Search
            value={searchInput}
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
        <Section className={'extended'}>
          <h3>Ingrédients</h3>
          <ul className="inventory-ingredients--list">
            {inventory &&
              inventory
                .filter(item => {
                  return item.name.toLowerCase().includes(searchInput.toLowerCase())
                })
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(item =>
                  React.Children.toArray(
                    <Ingredient
                      handleEditIngredient={handleEditIngredient}
                      handleDeleteIngredient={handleDeleteIngredient}
                      key={item.IngredientId}
                      name={item.name}
                      quantity={item.quantity}
                      IngredientId={item.IngredientId}
                      unit={item.unit}
                    />
                  )
                )}
          </ul>
        </Section>
        <SectionCTA className={'mobile-only no-border'}>
          <Search
            value={searchInput}
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
