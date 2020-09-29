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
  const [newIngredient, setNewIngredient] = useState({})

  const getInventory = () => {
    const url = 'http://localhost:8000/api/inventory/user/1'
    axios.get(url).then(res => setInventory(res.data))
  }

  const toggleDrawer = () => {
    isExpended ? toggleExpended(false) : toggleExpended(true)
  }

  const handleSwitchFilter = e => {
    let categoryName = e.target.name
    activeCategories[categoryName] = !activeCategories[categoryName]
    let updatedValues = activeCategories.categoryName
    setActiveCategories(prevState => {
      return { ...prevState, ...updatedValues }
    })
  }

  const toggleModal = () => {
    toggleIngredientModal(prevState => {
      return !prevState
    })
    isModalActive && setNewIngredient({})
  }

  const handleNewIngredient = e => {
    setNewIngredient({
      ...newIngredient,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmitIngredient = e => {
    e.preventDefault()
    const newIng = {
      ingredientName: newIngredient.name,
      category: newIngredient.category,
      quantity: newIngredient.quantity,
      unity: newIngredient.unity
    }
    axios
      .post('http://localhost:8000/api/inventory/user/1/ingredients', newIng)
      .then(res => console.log(res.data))
      .then(() => {
        toggleModal()
        getInventory()
      })
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
              onClick={handleSwitchFilter}
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
              onClick={handleSwitchFilter}
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
              onClick={handleSwitchFilter}
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
              onClick={handleSwitchFilter}
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
              onClick={handleSwitchFilter}
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
              onClick={handleSwitchFilter}
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
              onClick={handleSwitchFilter}
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
              React.Children.toArray(<Ingredient key={item.ingredientId} ingredient={item} />)
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
