import React from 'react'
import { Link } from 'react-router-dom'

import defaultImg from '../assets/images/defaultRecipe.jpg'
import '../sass/components/_RecipeCard.scss'
import '../sass/pages/_FullRecipe.scss'

export default function RecipeCard({ recipe }) {
  return (
    <>
      <Link
        className="recipe-link"
        to={{ pathname: `/recipes/${recipe.id}`, recipe: { ...recipe } }}
      >
        <li className="recipe-card">
          <div className="flexColumn">
            <h5>{recipe.name}</h5>
            <div className="flexRow flex1 alignItemsCenter">
              <ul className="taglist">
                {recipe.Tags.map(tag => (
                  <li key={`tagRecipe-${tag.TagRecipe.tagId}-${tag.TagRecipe.recipeId}`}>
                    #{tag.tagname}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="recipe-image-container">
            <img className="recipe-image" src={recipe.image || defaultImg} alt={recipe.name} />
          </div>
        </li>
      </Link>
    </>
  )
}
