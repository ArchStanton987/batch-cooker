import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../sass/pages/_newRecipe.scss'
import minusIcon from '../assets/icons/minus.svg'
import plusIcon from '../assets/icons/plus.svg'
import { postNewRecipe } from '../lib/recipies'

export default function NewRecipe() {
  const initialValue = {
    creatorId: 1,
    name: '',
    image: null,
    url: null,
    content: '',
    guests: null
  }

  const defaultIngredient = { name: '' }
  const defaultTag = { tagname: '' }

  const [newRecipe, setNewRecipe] = useState(initialValue)
  const [ingredients, setIngredients] = useState([{ ...defaultIngredient }])
  const [tags, setTags] = useState([{ ...defaultTag }])

  // ingredient handlers
  const addIngredient = () => {
    if (ingredients.length < 12) {
      setIngredients([...ingredients, { ...defaultIngredient }])
    }
  }
  const removeIngredient = index => {
    const ingredientList = [...ingredients]
    ingredientList.splice(index, 1)
    setIngredients(ingredientList)
  }
  const handleIngredientChange = (e, index) => {
    const ingredientList = [...ingredients]
    ingredientList[index].name = e.currentTarget.value
    setIngredients(ingredientList)
  }

  // Tag handlers
  const addTag = () => {
    if (tags.length < 4) {
      setTags([...tags, { ...defaultTag }])
    }
  }
  const removeTag = index => {
    const tagList = [...tags]
    tagList.splice(index, 1)
    setTags(tagList)
  }
  const handleTagChange = (e, index) => {
    const tagList = [...tags]
    tagList[index].tagname = e.currentTarget.value
    setTags(tagList)
  }

  // Recipe handlers
  const handleChangeNewRecipe = e => {
    setNewRecipe({
      ...newRecipe,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  const handleSubmitRecipe = async e => {
    e.preventDefault()
    const response = await postNewRecipe(newRecipe)
    const newRecipeId = response.recipeId

    // ingredients.forEach(ingredient => {

    // })
  }

  return (
    <>
      <div className="new-recipe">
        <h2>Création de recette</h2>
        <form onSubmit={handleSubmitRecipe} className="new-recipe-form" method="post">
          <div className="new-recipe section-container">
            <h3>Votre recette</h3>
            <label className="recipe-form--label" htmlFor="name">
              <p>Nom de la recette</p>
            </label>
            <input
              className="recipe-form--input"
              onChange={handleChangeNewRecipe}
              type="text"
              name="name"
              required
            />
            <label className="recipe-form--label" htmlFor="guests">
              <p>Nombre de couverts</p>
            </label>
            <input
              className="recipe-form--input"
              onChange={handleChangeNewRecipe}
              type="number"
              name="guests"
              required
            />
            <label className="recipe-form--label" htmlFor="image">
              <p>Image</p>
            </label>
            <input
              className="recipe-form--input"
              onChange={handleChangeNewRecipe}
              type="text"
              name="image"
            />
            <label className="recipe-form--label" htmlFor="url">
              <p>Lien vers ressource extérieure</p>
            </label>
            <input
              className="recipe-form--input"
              onChange={handleChangeNewRecipe}
              type="text"
              name="url"
            />
            <label className="recipe-form--label" htmlFor="content">
              <p>Détails</p>
            </label>
            <textarea
              onChange={handleChangeNewRecipe}
              className="new-recipe-content"
              id="content"
              name="content"
            />
          </div>
          <div className="new-recipe section-container">
            <h3>Associer les ingrédients (maximum : 12)</h3>
            <ul className="flexColumn justifyCenter">
              {ingredients.map((ingredient, i) => {
                return (
                  <li className="recipe-form--ingredient-container">
                    <p className="ingredient-number">{`Ingredient #${i + 1}`}</p>
                    <label className="ingredient-label--name" htmlFor={`ingredient-name-${i}`}>
                      <p>Nom</p>
                    </label>
                    <label
                      className="ingredient-label--quantity"
                      htmlFor={`ingredient-quantity-${i}`}
                    >
                      <p>Quantité</p>
                    </label>
                    <label className="ingredient-label--unity" htmlFor={`ingredient-unity-${i}`}>
                      <p>Unité</p>
                    </label>
                    <input
                      className="ingredient-input--name"
                      value={ingredient.name}
                      onChange={e => handleIngredientChange(e, i)}
                      type="text"
                      name={`ingredient-name-${i}`}
                      id={`ingredient-name-${i}`}
                    />
                    <input
                      className="ingredient-input--quantity"
                      value={ingredient.quantity}
                      onChange={e => handleIngredientChange(e, i)}
                      type="number"
                      name={`ingredient-quantity-${i}`}
                      id={`ingredient-quantity-${i}`}
                    />
                    <input
                      className="ingredient-input--unity"
                      value={ingredient.unity}
                      onChange={e => handleIngredientChange(e, i)}
                      type="text"
                      name={`ingredient-unity-${i}`}
                      id={`ingredient-unity-${i}`}
                    />
                    {
                      <img
                        className="remove-element-btn"
                        onClick={() => removeIngredient(i)}
                        src={minusIcon}
                        alt={`remove ingredient ${i}`}
                      />
                    }
                  </li>
                )
              })}
            </ul>
            <img
              className="new-recipe--add-icon"
              src={plusIcon}
              alt="add ingredient"
              onClick={addIngredient}
            />
          </div>
          <div className="new-recipe section-container">
            <h3>Associer des tags (maximum : 4)</h3>
            <ul>
              {tags.map((tag, i) => {
                return (
                  <li className="recipe-form--tag-container" key={`tag-${i}`}>
                    <label className="recipe-form--label">
                      <p>{`Tag #${i + 1}`}</p>
                    </label>
                    <div className="flexRow alignItemsCenter">
                      <input
                        className="recipe-form--tag-input"
                        value={tag.tagname}
                        onChange={e => handleTagChange(e, i)}
                        type="text"
                        name={`tag-${i}`}
                        id={`tag-${i}`}
                      />
                      {
                        <img
                          className="remove-element-btn tag"
                          onClick={() => removeTag(i)}
                          src={minusIcon}
                          alt={`remove tag ${i}`}
                        />
                      }
                    </div>
                  </li>
                )
              })}
            </ul>
            <img className="new-recipe--add-icon" src={plusIcon} alt="add tag" onClick={addTag} />
          </div>
          <div className="flexRow spaceBetween">
            <Link to="/recipes">
              <button>Retour</button>
            </Link>
            <button type="submit">Enregistrer</button>
          </div>
        </form>
      </div>
    </>
  )
}
