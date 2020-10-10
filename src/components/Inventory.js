import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { fetchUserInventory, parseFetchedInventory } from '../lib/inventory'
import { ingredientCategories } from '../lib/ingredientCategories'
import Ingredient from '../containers/Ingredient'
import '../sass/pages/_Inventory.scss'
import InventoryModal from '../containers/InventoryModal'
import Searchbox from '../containers/Searchbox'
import chevron from '../assets/icons/chevron.svg'

export default function Inventory() {
  const [isExpended, setDrawer] = useState(false)
  const [isModalActive, setIngredientModal] = useState(false)
  const [activeCategories, setActiveCategories] = useState(ingredientCategories)
  const [inventory, setInventory] = useState([])
  const [newIngredient, setNewIngredient] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  let categories = Object.entries(activeCategories)

  const scrollableRef = useRef(null)

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
  const handleResetSearchInput = () => {
    const searchboxSearch = document.getElementById('inventory-searchbox_search') || {}
    searchboxSearch.value = ''
    setSearchInput('')
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
    handleFetchInventory(userId)
  }, [])

  return (
    <>
      {isModalActive && (
        <InventoryModal
          handleSubmitIngredient={handleSubmitIngredient}
          handleNewIngredient={handleNewIngredient}
          toggleModal={toggleModal}
          name={newIngredient ? newIngredient.name : ''}
          category={newIngredient ? newIngredient.category : ''}
          ingredientId={newIngredient ? newIngredient.ingredientId : ''}
          quantity={newIngredient ? newIngredient.quantity : ''}
          unity={newIngredient ? newIngredient.unity : ''}
        />
      )}
      <h2>Inventaire</h2>
      <div className="inventory-category section-container">
        <div onClick={toggleDrawer} className="drawer-container">
          <h3>Catégories</h3>
          <img
            alt="reveal categories"
            src={chevron}
            className={isExpended ? 'inventory-category-arrow' : 'inventory-category-arrow rotated'}
          />
        </div>
        <ul
          className={isExpended ? 'inventory-category_list' : 'inventory-category_list retracted'}
        >
          {categories.map(category => {
            return (
              <li key={`category-${category[0]}`}>
                <button
                  name={category[0]}
                  onClick={toggleCategoryFilter}
                  className={
                    category[1].active === true
                      ? 'inventory-category_name'
                      : 'inventory-category_name inactive'
                  }
                >
                  {category[1].fullname}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div ref={scrollableRef} className="inventory-ingredients section-container">
        <h3>Ingrédients</h3>
        <ul className="inventory-ingredients_list">
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
                    scrollableRef={scrollableRef}
                  />
                )
              )}
        </ul>
      </div>
      <Searchbox
        toggleModal={toggleModal}
        scrollableRef={scrollableRef}
        handleResetSearchInput={handleResetSearchInput}
        handleSearchInput={handleSearchInput}
        parentName={'inventory'}
      />
    </>
  )
}
