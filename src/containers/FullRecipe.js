import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/fr'

import { fetchRecipe, parseFetchedRecipe } from '../lib/recipies'
import '../sass/pages/_FullRecipe.scss'
import '../sass/components/_Ingredient.scss'

export default function FullRecipe(props) {
  const [recipe, setRecipe] = useState({})
  const { name, ingredients, content, url, image, username, createdAt, updatedAt } = recipe

  const recipeId = props.match.params.id

  moment.locale('fr')

  const handleFetchRecipe = async recipeId => {
    const result = await fetchRecipe(recipeId)
    const parsedResults = parseFetchedRecipe(result)
    setRecipe(parsedResults)
  }

  useEffect(() => {
    handleFetchRecipe(recipeId)
  }, [recipeId])

  return (
    <>
      <h2>{name}</h2>
      <p>
        Auteur : <span>{username}</span> le {moment(createdAt).format('LL')}
      </p>
      {createdAt !== updatedAt && <p>Edité le {moment(updatedAt).format('LL')}</p>}
      <div className="h3-container">
        <h3>Tags</h3>
        <ul className="recipe-taglist">
          <li>
            <p>#saison</p>
          </li>
          <li>
            <p>#été</p>
          </li>
          <li>
            <p>#charcuterie</p>
          </li>
        </ul>
      </div>
      {image && (
        <div className="h3-container">
          <img src={image} className="recipe-img" alt={name} />
        </div>
      )}
      <div className="h3-container">
        <h3>Ingrédients</h3>
        <ul className="recipe-ingredient-list">
          {ingredients &&
            ingredients.map(ingredient => (
              <li className="ingredient-item" key={`recipeIng-${ingredient.recipeIng}`}>
                <p className="name">{ingredient.name}</p>
                <p className="quantity">{ingredient.quantity}</p>
                <p className="unity"> {ingredient.unity}</p>
              </li>
            ))}
        </ul>
      </div>
      <div className="h3-container">
        <h3>Prépration</h3>
        <p className="recipe-preparation">{content}</p>
      </div>
      {url && (
        <div className="h3-container">
          <h3>Source</h3>
          <a href={url} className="recipe-preparation">
            <p>Lien vers la recette d'origine</p>
          </a>
        </div>
      )}
    </>
  )
}
