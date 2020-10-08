import React from 'react'

import defaultImg from '../assets/images/defaultRecipe.jpg'
import '../sass/components/_Recipe.scss'

export default function Recipe({ recipe }) {
  return (
    <>
      <li className="recipe-card">
        <h5>{recipe.name}</h5>
        <img className="recipe_image" src={recipe.image || defaultImg} alt={recipe.name} />
      </li>
    </>
  )
}
