import React from 'react'

import '../sass/components/_Recipe.scss'

export default function Recipe({ recipe }) {
  return (
    <>
      <li className="recipe-list-item">
        <p>{recipe.name}</p>
      </li>
    </>
  )
}
