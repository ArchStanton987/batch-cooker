import React from 'react'
import { Link } from 'react-router-dom'

import defaultImg from '../assets/images/defaultRecipe.jpg'
import '../sass/components/_Recipe.scss'

export default function RecipeCard({ recipe }) {
  return (
    <>
      <Link
        className="recipe-link"
        to={{ pathname: `/recipes/${recipe.id}`, recipe: {...recipe} }}
      >
        <li className="recipe-card">
          <h5>{recipe.name}</h5>
          <img className="recipe_image" src={recipe.image || defaultImg} alt={recipe.name} />
        </li>
      </Link>
    </>
  )
}
