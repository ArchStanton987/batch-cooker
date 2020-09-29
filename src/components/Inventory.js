import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Ingredient from '../containers/Ingredient'
import SearchBox from '../containers/SearchBox'
import '../sass/pages/_Inventory.scss'

export default function Inventory() {
  const [inventory, setInventory] = useState([])
  const [isExpended, setIsExpended] = useState(true)

  const getInventory = () => {
    const url = 'http://localhost:8000/api/inventory/user/1'
    axios.get(url).then(res => setInventory(res.data))
  }

  const drawer = () => {
    isExpended ? setIsExpended(false) : setIsExpended(true)
  }

  useEffect(() => {
    getInventory()
  }, [])

  return (
    <>
      <h2>Inventaire</h2>
      <div className="inventory-category h3-container">
        <div className="inventory-category-circle">
          <div
            className={isExpended ? 'inventory-category-arrow' : 'inventory-category-arrow rotated'}
          ></div>
        </div>
        <h3 onClick={drawer}>Catégories</h3>
        <ul
          className={isExpended ? 'inventory-category-list' : 'inventory-category-list retracted'}
        >
          <li>
            <button className="inventory-category-name-inactive">
              assaisonnements / condiments
            </button>
          </li>
          <li>
            <button className="inventory-category-name">produits laitiers</button>
          </li>
          <li>
            <button className="inventory-category-name">viandes / poissons</button>
          </li>
          <li>
            <button className="inventory-category-name">céréales / féculents</button>
          </li>
          <li>
            <button className="inventory-category-name-inactive">fruits / légumes</button>
          </li>
          <li>
            <button className="inventory-category-name">sucrés</button>
          </li>
          <li>
            <button className="inventory-category-name">autres</button>
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