import React from 'react'
import '../sass/components/_Ingredient.scss'

export default function Ingredient({ handleDeleteIngredient, ingredient }) {
  return (
    <li className="ingredient-item">
      <p className="ingredient-item-name">{ingredient.Ingredient.name}</p>
      <p className="ingredient-item-quantity">{ingredient.quantity}</p>
      <p className="ingredient-item-unity">{ingredient.unity}</p>
      <span
        onClick={() => handleDeleteIngredient(ingredient.ingredientId)}
        className="ingredient-item-delete"
      >
        &#10005;
      </span>
    </li>
  )
}
