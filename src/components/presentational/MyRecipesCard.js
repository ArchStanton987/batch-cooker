import React from 'react'
import { Link } from 'react-router-dom'

import defaultImg from '../../assets/images/defaultRecipe.jpg'
import '../../sass/components/_MyRecipesCard.scss'
import '../../sass/pages/_FullRecipe.scss'

export default function MyRecipesCard({ recipe }) {
  return (
    <>
      <Link
        className="recipe-link"
        to={{ pathname: `/recipes/${recipe.id}`, recipe: { ...recipe } }}
      >
        <li className="myrecipes-card">
          <div className="info">
            <h5>{recipe.name}</h5>
          </div>
          <div className="myrecipes-image-container">
            <img
              className="myrecipes-card-image"
              src={recipe.image || defaultImg}
              alt={recipe.name}
            />
          </div>
        </li>
      </Link>
    </>
  )
}
