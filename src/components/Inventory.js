import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Ingredient from '../containers/Ingredient'
import SearchBox from '../containers/SearchBox'
import '../sass/pages/_Inventory.scss'

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
  const [isExpended, setIsExpended] = useState(true)

  const getInventory = () => {
    const url = 'http://localhost:8000/api/inventory/user/1'
    axios.get(url).then(res => setInventory(res.data))
  }

  const drawer = () => {
    isExpended ? setIsExpended(false) : setIsExpended(true)
  }

  const setActiveCategory = e => {
    let categoryName = e.target.name
    activeCategories[categoryName] = !activeCategories[categoryName]
    let updatedValues = activeCategories.categoryName
    setActiveCategories(prevState => {
      return { ...prevState, ...updatedValues }
    })
  }

  useEffect(() => {
    getInventory()
  }, [])

  return (
    <>
      <h2>Inventaire</h2>
      <div className="inventory-category h3-container">
        <div onClick={drawer} className="drawer-container">
          <div className="inventory-category-circle">
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
              onClick={setActiveCategory}
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
              onClick={setActiveCategory}
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
              onClick={setActiveCategory}
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
              onClick={setActiveCategory}
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
              onClick={setActiveCategory}
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
              onClick={setActiveCategory}
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
              onClick={setActiveCategory}
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
            inventory.map(item => React.Children.toArray(<Ingredient ingredient={item} />))}
        </ul>
        <button className="inventory-ingredients-add-button button">Ajouter</button>
      </div>
      <SearchBox />
    </>
  )
}
