import React from 'react'

import '../../sass/components/_DynamicFormIngredient.scss'
import minusIcon from '../../assets/icons/minus.svg'

export default function DynamicFormIngredient({ ...props }) {
  const { handleIngredientChange, removeIngredient, ingredient, index } = props
  return (
    <li className="dynform--ingdt-container">
      <p className="ingredient-number">{`Ingredient #${index + 1}`}</p>
      <label className="ingdt-label--name" htmlFor={`ingredient-name-${index}`}>
        <p>Nom</p>
      </label>
      <label className="ingdt-label--quantity" htmlFor={`ingredient-quantity-${index}`}>
        <p>Quantité</p>
      </label>
      <label className="ingdt-label--unit" htmlFor={`ingredient-unit-${index}`}>
        <p>Unité</p>
      </label>
      <input
        type="text"
        id={`ingredient-name-${index}`}
        name="name"
        className="ingdt-input--name"
        value={ingredient.name}
        onChange={e => handleIngredientChange(e, index)}
        required
      />
      <input
        type="number"
        id={`ingredient-quantity-${index}`}
        name="quantity"
        className="ingdt-input--quantity"
        value={ingredient.quantity}
        onChange={e => handleIngredientChange(e, index)}
        min="0"
      />
      <input
        type="text"
        id={`ingredient-unit-${index}`}
        name="unit"
        className="ingdt-input--unit"
        value={ingredient.unit || ''}
        onChange={e => handleIngredientChange(e, index)}
      />
      {
        <img
          className="remove-element-btn"
          onClick={() => removeIngredient(index)}
          src={minusIcon}
          alt={`remove ingredient ${index}`}
        />
      }
    </li>
  )
}
