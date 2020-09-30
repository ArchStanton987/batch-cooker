import React from 'react'
import '../sass/components/_Ingredient.scss'

export default function Ingredient({ handleEditIngredient, handleDeleteIngredient, ...props }) {
  const { ingredientId, name, quantity, unity } = props
  return (
    <li className="ingredient-item">
      <p onClick={() => handleEditIngredient(ingredientId)} className="ingredient-item-name">
        {name}
      </p>
      <p onClick={() => handleEditIngredient(ingredientId)} className="ingredient-item-quantity">
        {quantity}
      </p>
      <p onClick={() => handleEditIngredient(ingredientId)} className="ingredient-item-unity">
        {unity}
      </p>
      <span onClick={() => handleDeleteIngredient(ingredientId)} className="ingredient-item-delete">
        &#10005;
      </span>
    </li>
  )
}
