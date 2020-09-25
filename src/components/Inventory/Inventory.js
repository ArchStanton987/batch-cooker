import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
      <p>Hello from inventory !</p>
      {inventory &&
        inventory.map(item => React.Children.toArray(<p>{item.Ingredient.name}</p>))}
    </>
  )
}
