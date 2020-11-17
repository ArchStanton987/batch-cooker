import React from 'react'
import { Link } from 'react-router-dom'

import favIcon from '../../assets/icons/star-full-yellow.svg'
import defaultImage from '../../assets/images/defaultRecipe.jpg'

import '../../sass/components/_RecipeCard.scss'

export default function RecipeCard({ recipe }) {
  const { id, image, name, Tags, isSavedByUser } = recipe
  return (
    <>
      <Link to={{ pathname: `/recipes/${id}`, recipe: { ...recipe } }}>
        <div className="recipe-card">
          <img className="recipe-card--image" src={image || defaultImage} alt={name} />
          <div className="recipe-card--info">
            <h5>{name}</h5>
            <ul className="recipe-card--taglist">
              {Tags &&
                Tags.map(tag => (
                  <li key={`recipe-${id}-tag-${tag.id}`}>
                    <p>#{tag.tagname}</p>
                  </li>
                ))}
            </ul>
          </div>
          {isSavedByUser === 1 && (
            <img className="recipe-card--favicon" src={favIcon} alt="enregistrée" />
          )}
        </div>
      </Link>
    </>
  )
}
