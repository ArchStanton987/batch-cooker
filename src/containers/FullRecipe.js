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
      <div className="full-recipe">
        <h2>{name}</h2>
        <div className="section-container recipe-header">
          <div className="header-text">
            <p className="recipe-text">
              <span>{username}</span>
            </p>
            <p className="recipe-text">le {moment(createdAt).format('LL')}</p>
            {createdAt !== updatedAt && (
              <p className="recipe-text">Edité le {moment(updatedAt).format('LL')}</p>
            )}
            <p className="recipe-text">Pour 4 personnes</p>
            <p className="recipe-text">Note moy. : 5/10</p>
          </div>
          <div className="recipe-img-container">
            {image && <img src={image} className="recipe-img" alt={name} />}
          </div>
          <div className="header-tags">
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
              <li>
                <p>#enfants</p>
              </li>
              <li>
                <p>#gourmandise</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="section-container">
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
        <div className="section-container">
          <h3>Prépration</h3>
          <p className="recipe-text">{content}</p>
        </div>
        {url && (
          <div className="section-container">
            <h3>Source</h3>
            <a href={url} className="recipe-text" rel="noopener noreferrer" target="_blank">
              <p>Lien vers la recette d'origine</p>
            </a>
          </div>
        )}
        <div className="section-container">
          <h3>Avis</h3>
          <p className="recipe-text">Il n'y a aucun avis sur cette recette pour le moment.</p>
        </div>
      </div>
      {/* <div className>

      </div> */}
    </>
  )
}
