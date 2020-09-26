import React, { useEffect, useState } from 'react'
import axios from 'axios'

import SearchBox from '../containers/SearchBox'
import '../sass/pages/_Inventory.scss'

export default function Inventory() {
  const [inventory, setInventory] = useState([])

  const getInventory = () => {
    const url = 'http://localhost:8000/api/inventory/user/1'
    axios.get(url).then(res => setInventory(res.data))
  }

  useEffect(() => {
    getInventory()
  }, [])

  return (
    <>
      <h2>Inventaire</h2>
      <div>
        <h3>Catégories d'ingrédients :</h3>
        <ul className='ingredient-category-list'>
          <li><button className='ingredient-category-name'>assaisonnements</button></li>
          <li><button className='ingredient-category-name'>viandes et poissons</button></li>
          <li><button className='ingredient-category-name'>produits laitiers</button></li>
          <li><button className='ingredient-category-name-inactive'>corps gras</button></li>
          <li><button className='ingredient-category-name'>fruits</button></li>
          <li><button className='ingredient-category-name-inactive'>légumes</button></li>
          <li><button className='ingredient-category-name'>céréales et féculants</button></li>
          <li><button className='ingredient-category-name'>sucrés</button></li>
          <li><button className='ingredient-category-name-inactive'>sauces et liquides</button></li>
          <li><button className='ingredient-category-name'>autres</button></li>
        </ul>
      </div>
      <div className="ingredient-list">
        {inventory && inventory.map(item => React.Children.toArray(<p>{item.Ingredient.name}</p>))}
      </div>
      <SearchBox />
    </>
  )
}
