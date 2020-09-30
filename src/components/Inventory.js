import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Ingredient from '../containers/Ingredient'
import SearchBox from '../containers/SearchBox'
import '../sass/pages/_Inventory.scss'
import InventoryModal from '../containers/InventoryModal'

export default function Inventory() {
  let includeCategories = {
    spices: true,
    dairy: true,
    meat: true,
    cereal: true,
    fruits: true,
    sweet: true,
    other: true
  }

  const [activeCategories, setActiveCategories] = useState(includeCategories)
  const [inventory, setInventory] = useState([])
  const [isExpended, toggleExpended] = useState(true)
  const [isModalActive, toggleIngredientModal] = useState(false)
  const [newIngredient, setNewIngredient] = useState(null)

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
    activeCategories[categoryName] = !activeCategories[categoryName]
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
          <div className="inventory-category-arrow-container">
            <div
              className={
                isExpended ? 'inventory-category-arrow' : 'inventory-category-arrow rotated'
              }
            ></div>
          </div>
          <h3>Catégories</h3>
        </div>
        <ul
          className={isExpended ? 'inventory-category-list' : 'inventory-category-list retracted'}
        >
          <li>
            <button
              name="spices"
              onClick={toggleCategoryFilter}
              className={
                activeCategories.spices
                  ? 'inventory-category-name'
                  : 'inventory-category-name-inactive'
              }
            >
              assaisonnements / condiments
            </button>
          </li>
          <li>
            <button
              name="dairy"
              onClick={toggleCategoryFilter}
              className={
                activeCategories.dairy
                  ? 'inventory-category-name'
                  : 'inventory-category-name-inactive'
              }
            >
              produits laitiers
            </button>
          </li>
          <li>
            <button
              name="meat"
              onClick={toggleCategoryFilter}
              className={
                activeCategories.meat
                  ? 'inventory-category-name'
                  : 'inventory-category-name-inactive'
              }
            >
              viandes / poissons
            </button>
          </li>
          <li>
            <button
              name="cereal"
              onClick={toggleCategoryFilter}
              className={
                activeCategories.cereal
                  ? 'inventory-category-name'
                  : 'inventory-category-name-inactive'
              }
            >
              céréales / féculents
            </button>
          </li>
          <li>
            <button
              name="fruits"
              onClick={toggleCategoryFilter}
              className={
                activeCategories.fruits
                  ? 'inventory-category-name'
                  : 'inventory-category-name-inactive'
              }
            >
              fruits / légumes
            </button>
          </li>
          <li>
            <button
              name="sweet"
              onClick={toggleCategoryFilter}
              className={
                activeCategories.sweet
                  ? 'inventory-category-name'
                  : 'inventory-category-name-inactive'
              }
            >
              sucrés
            </button>
          </li>
          <li>
            <button
              name="other"
              onClick={toggleCategoryFilter}
              className={
                activeCategories.other
                  ? 'inventory-category-name'
                  : 'inventory-category-name-inactive'
              }
            >
              autres
            </button>
          </li>
        </ul>
      </div>
      <div className="inventory-ingredients h3-container">
        <h3>Ingrédients</h3>
        <ul className="inventory-ingredients-list">
          {inventory &&
            inventory.map(item =>
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
        <button onClick={toggleModal} className="inventory-ingredients-add-button button">
          Ajouter
        </button>
      </div>
      <SearchBox />
    </>
  )
}
