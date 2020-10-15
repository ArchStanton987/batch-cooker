import React from 'react'

import '../sass/components/_DynamicFormIngredient.scss'
import minusIcon from '../assets/icons/minus.svg'

export default function DynamicFormIngredient({ ...props }) {
  const { handleIngredientChange, removeIngredient, ingredient, index } = props
  return (
    <li className="dynform--ingdt-container">
      <p className="ingredient-number">{`Ingredient #${index + 1}`}</p>
      <select
        className="ingdt--category"
        onChange={e => handleIngredientChange(e, index)}
        id="category"
        name="category"
        required
      >
        <option value="">Catégorie</option>
        <option value="fruits et légumes">fruits et légumes</option>
        <option value="viandes et poissons">viandes et poissons</option>
        <option value="produits laitiers">produits laitiers</option>
        <option value="assaisonnements et condiments">assaisonnements et condiments</option>
        <option value="céréales et féculents">céréales et féculents</option>
        <option value="sucrés">sucrés</option>
        <option value="autres">autres</option>
      </select>
      <label className="ingdt-label" htmlFor={`ingredient-name-${index}`}>
        <p>Nom</p>
      </label>
      <label className="ingdt-label" htmlFor={`ingredient-quantity-${index}`}>
        <p>Quantité</p>
      </label>
      <label className="ingdt-label" htmlFor={`ingredient-unity-${index}`}>
        <p>Unité</p>
      </label>
      <input
        className="ingdt-input--name"
        value={ingredient.name}
        onChange={e => handleIngredientChange(e, index)}
        type="text"
        name="name"
        id={`ingredient-name-${index}`}
        required
      />
      <input
        className="ingdt-input--quantity"
        value={ingredient.quantity}
        onChange={e => handleIngredientChange(e, index)}
        type="number"
        name="quantity"
        id={`ingredient-quantity-${index}`}
        required
      />
      <input
        className="ingdt-input--unity"
        value={ingredient.unity}
        onChange={e => handleIngredientChange(e, index)}
        type="text"
        name="unity"
        id={`ingredient-unity-${index}`}
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
