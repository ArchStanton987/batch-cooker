import React from 'react'
import '../../sass/components/_Ingredient.scss'

export default function Ingredient({ handleEditIngredient, handleDeleteIngredient, ...props }) {
  const { IngredientId, name, quantity, unit } = props
  return (
    <li className="ingredient-item">
      <p onClick={() => handleEditIngredient(IngredientId)} className="name">
        {name}
      </p>
      <p onClick={() => handleEditIngredient(IngredientId)} className="quantity">
        {quantity}
      </p>
      <p onClick={() => handleEditIngredient(IngredientId)} className="unit">
        {unit}
      </p>
      <span onClick={() => handleDeleteIngredient(IngredientId)} className="delete">
        &#10005;
      </span>
    </li>
  )
}
