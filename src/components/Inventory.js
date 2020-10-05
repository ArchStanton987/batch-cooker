import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import Ingredient from '../containers/Ingredient'
import '../sass/pages/_Inventory.scss'
import InventoryModal from '../containers/InventoryModal'
import chevron from '../assets/img/chevron.svg'
import searchIcon from '../assets/img/search.svg'
import cross from '../assets/img/x.svg'

export default function Inventory({ isSearchBoxActive }) {
  let includeCategories = {
    spices: { active: true, fullname: 'assaisonnements et condiments' },
    dairy: { active: true, fullname: 'produits laitiers' },
    meat: { active: true, fullname: 'viandes et poissons' },
    cereal: { active: true, fullname: 'céréales et féculents' },
    fruits: { active: true, fullname: 'fruits et légumes' },
    sweet: { active: true, fullname: 'sucrés' },
    other: { active: true, fullname: 'autres' }
  }

  const [isExpended, setDrawer] = useState(false)
  const [isModalActive, setIngredientModal] = useState(false)
  const [isToolboxActive, setToolbox] = useState(false)
  const [activeCategories, setActiveCategories] = useState(includeCategories)
  const [inventory, setInventory] = useState([])
  const [newIngredient, setNewIngredient] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  let categories = Object.entries(activeCategories)

  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

  const ingredientTop = useRef(null)

  const getInventory = () => {
    const url = 'http://192.168.1.27:8000/api/inventory/user/1'
    axios.get(url).then(res => {
      let inventory = []
      res.data.forEach(item => {
        let newItem = {
          ingredientId: item.ingredientId,
          name: item.Ingredient.name,
          category: item.Ingredient.category,
          quantity: item.quantity,
          unity: item.unity
        }
        inventory.push(newItem)
      })
      setInventory(inventory)
    })
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
  const toggleToolbox = () => {
    setToolbox(prevState => !prevState)
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
    const toolboxSearch = document.getElementById('inventory-toolbox_search') || {}
    toolboxSearch.value = ''
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
      .then(() => getInventory())
  }

  const handleAddToInventory = newIng => {
    axios.post('http://192.168.1.27:8000/api/inventory/user/1/ingredients', newIng).then(() => {
      toggleModal()
      getInventory()
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
        getInventory()
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
    getInventory()
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
      <div className="inventory-category h3-container">
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
      <div ref={ingredientTop} className="inventory-ingredients h3-container">
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
      </div>
      <div className="inventory-toolbox">
        <img
          onClick={toggleToolbox}
          src={searchIcon}
          alt="search"
          className="inventory-toolbox_searchIcon"
        />
        <input
          type="text"
          id="inventory-toolbox_search"
          onChange={e => {
            handleSearchInput(e)
            scrollToRef(ingredientTop)
          }}
          onFocus={() => setTimeout(() => scrollToRef(ingredientTop), 500)}
          className={
            isToolboxActive ? 'inventory-toolbox_input' : 'inventory-toolbox_input inactive'
          }
          disabled={isToolboxActive && false}
        />
        <img
          onClick={handleResetSearchInput}
          className={
            isToolboxActive
              ? 'inventory-toolbox_deleteIcon'
              : 'inventory-toolbox_deleteIcon inactive'
          }
          alt="delete search"
          src={cross}
        />
        <button onClick={toggleModal} className="inventory-ingredients_add-button">
          Ajouter
        </button>
      </div>
    </>
  )
}
