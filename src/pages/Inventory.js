import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { fetchUserInventory, parseFetchedInventory } from '../lib/inventory'
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
import LoginForm from '../containers/LoginForm'

export default function Inventory(props) {
  const { isLogged, setIsLogged, setToken } = props

  const [isExpended, setDrawer] = useState(false)
  const [isModalActive, setIngredientModal] = useState(false)
  const [activeCategories, setActiveCategories] = useState(ingredientCategories)
  const [inventory, setInventory] = useState([])
  const [newIngredient, setNewIngredient] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [isSearchboxActive, setSearchbox] = useState(false)

  const toggleSearchbox = () => setSearchbox(prevState => !prevState)

  let categories = Object.entries(activeCategories)

  const userId = 1

  const handleFetchInventory = async userId => {
    const result = await fetchUserInventory(userId)
    const parsedResult = parseFetchedInventory(result)
    setInventory(parsedResult)
  }

  const toggleModal = () => {
    setIngredientModal(prevState => !prevState)
    isModalActive && setNewIngredient(null)
  }
  const toggleDrawer = () => {
    setDrawer(prevState => !prevState)
  }
  const toggleCategoryFilter = e => {
    let categoryName = e.target.name
    activeCategories[categoryName].active = !activeCategories[categoryName].active
    let updatedValues = activeCategories.categoryName
    setActiveCategories(prevState => {
      return { ...prevState, ...updatedValues }
    })
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

  const handleDeleteIngredient = id => {
    axios
      .delete(`http://192.168.1.27:8000/api/inventory/user/1/ingredients/${id}`)
      .then(() => handleFetchInventory(userId))
  }

  const handleAddToInventory = newIng => {
    axios.post('http://192.168.1.27:8000/api/inventory/user/1/ingredients', newIng).then(() => {
      toggleModal()
      handleFetchInventory(userId)
    })
  }
  const handleUpdateFromInventory = newIng => {
    axios
      .put(
        `http://192.168.1.27:8000/api/inventory/user/1/ingredients/${newIng.ingredientId}`,
        newIng
      )
      .then(() => {
        toggleModal()
        handleFetchInventory(userId)
      })
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
    const verifyAuth = () => {
      // let authCookie = document.cookie
      console.log(document.cookie)
    }
    verifyAuth()
    handleFetchInventory(userId)
  }, [])

  return (
    <>
      <div className="page">
        {!isLogged && <LoginForm setToken={setToken} setIsLogged={setIsLogged}/>}
        {isModalActive && (
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
          <div onClick={toggleDrawer} className="drawer-container">
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
            toggleSearchbox={toggleSearchbox}
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
