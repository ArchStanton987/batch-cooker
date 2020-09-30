import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Ingredient from '../containers/Ingredient'
import '../sass/pages/_Inventory.scss'
import InventoryModal from '../containers/InventoryModal'
import chevron from './../assets/img/chevron.svg'

export default function Inventory() {
  let includeCategories = {
    spices: { active: true, fullname: 'assaisonnements et condiments' },
    dairy: { active: true, fullname: 'produits laitiers' },
    meat: { active: true, fullname: 'viandes et poissons' },
    cereal: { active: true, fullname: 'céréales et féculents' },
    fruits: { active: true, fullname: 'fruits et légumes' },
    sweet: { active: true, fullname: 'sucrés' },
    other: { active: true, fullname: 'autres' }
  }

  const [activeCategories, setActiveCategories] = useState(includeCategories)
  const [inventory, setInventory] = useState([])
  const [isExpended, toggleExpended] = useState(true)
  const [isModalActive, toggleIngredientModal] = useState(false)
  const [newIngredient, setNewIngredient] = useState(null)

  let categories = Object.entries(activeCategories)

  const getInventory = () => {
    const url = 'http://localhost:8000/api/inventory/user/1'
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
    toggleIngredientModal(prevState => {
      return !prevState
    })
    isModalActive && setNewIngredient(null)
  }
  const toggleDrawer = () => {
    isExpended ? toggleExpended(false) : toggleExpended(true)
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

  const handleEditIngredient = id => {
    let ingredientData = inventory.filter(ingredient => ingredient.ingredientId === id)
    setNewIngredient(ingredientData[0])
    toggleModal()
  }

  const handleDeleteIngredient = id => {
    axios
      .delete(`http://localhost:8000/api/inventory/user/1/ingredients/${id}`)
      .then(() => getInventory())
  }

  const handleAddToInventory = newIng => {
    axios.post('http://localhost:8000/api/inventory/user/1/ingredients', newIng).then(() => {
      toggleModal()
      getInventory()
    })
  }
  const handleUpdateFromInventory = newIng => {
    axios
      .put(`http://localhost:8000/api/inventory/user/1/ingredients/${newIng.ingredientId}`, newIng)
      .then(() => {
        toggleModal()
        getInventory()
      })
  }
  const handleSubmitIngredient = (e, isEditing) => {
    e.preventDefault()
    const newIng = {
      ingredientId: newIngredient.ingredientId || null,
      ingredientName: newIngredient.name,
      category: newIngredient.category,
      quantity: newIngredient.quantity,
      unity: newIngredient.unity
    }
    isEditing ? handleUpdateFromInventory(newIng) : handleAddToInventory(newIng)
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
          className={isExpended ? 'inventory-category-list' : 'inventory-category-list retracted'}
        >
          {categories.map(category => {
            return (
              <li key={`category-${category[0]}`}>
                <button
                  name={category[0]}
                  onClick={toggleCategoryFilter}
                  className={
                    category[1].active === true
                      ? 'inventory-category-name'
                      : 'inventory-category-name-inactive'
                  }
                >
                  {category[1].fullname}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="inventory-ingredients h3-container">
        <h3>Ingrédients</h3>
        <ul className="inventory-ingredients-list">
          {inventory &&
            inventory
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
      <button onClick={toggleModal} className="inventory-ingredients-add-button button">
        Ajouter
      </button>
    </>
  )
}
