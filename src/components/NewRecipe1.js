import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import '../sass/pages/_newRecipe.scss'
import minusIcon from '../assets/icons/minus.svg'
import { postNewRecipe } from '../lib/recipies'

export default function NewRecipe1() {
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
  const [redirectPage2, setRedirectPage2] = useState(false)
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
    await postNewRecipe(newRecipe)
    setRedirectPage2(prevState => !prevState)
  }

  return (
    <>
      {redirectPage2 && <Redirect to={{ pathname: '/recipes/new/2', recipe: { ...newRecipe } }} />}
      <div className="new-recipe">
        <h2>Création de recette</h2>
        <form onSubmit={handleSubmitRecipe} className="new-recipe-form" method="post">
          <div className="new-recipe section-container">
            <h3>Votre recette</h3>
            <label htmlFor="name">
              <p>Nom de la recette</p>
            </label>
            <input onChange={handleChangeNewRecipe} type="text" name="name" required />
            <label htmlFor="guests">
              <p>Nombre de couverts</p>
            </label>
            <input onChange={handleChangeNewRecipe} type="number" name="guests" required />
            <label htmlFor="image">
              <p>Image</p>
            </label>
            <input onChange={handleChangeNewRecipe} type="text" name="image" />
            <label htmlFor="url">
              <p>Lien vers ressource extérieure</p>
            </label>
            <input onChange={handleChangeNewRecipe} type="text" name="url" />
            <label htmlFor="content">
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
            {ingredients.map((ingredient, i) => {
              return (
                <div className="flexColumn" key={`ingredient-${i}`}>
                  <label>
                    <p>{`Ingredient #${i + 1}`}</p>
                  </label>
                  <div className="flexRow alignItemsCenter">
                    <input
                      value={ingredient.name}
                      onChange={e => handleIngredientChange(e, i)}
                      type="text"
                      name={`ingredient-${i}`}
                      id={`ingredient-${i}`}
                    />
                    {i > 0 && (
                      <img
                        className="remove-element-btn"
                        onClick={() => removeIngredient(i)}
                        src={minusIcon}
                        alt={`remove ingredient ${i}`}
                      />
                    )}
                  </div>
                </div>
              )
            })}
            <input className="input-type-button" onClick={addIngredient} type="button" value="+" />
          </div>
          <div className="new-recipe section-container">
            <h3>Associer des tags (maximum : 4)</h3>
            {tags.map((tag, i) => {
              return (
                <div className="flexColumn" key={`tag-${i}`}>
                  <label>
                    <p>{`Tag #${i + 1}`}</p>
                  </label>
                  <div className="flexRow alignItemsCenter">
                    <input
                      value={tag.tagname}
                      onChange={e => handleTagChange(e, i)}
                      type="text"
                      name={`tag-${i}`}
                      id={`tag-${i}`}
                    />
                    {i > 0 && (
                      <img
                        className="remove-element-btn"
                        onClick={() => removeTag(i)}
                        src={minusIcon}
                        alt={`remove tag ${i}`}
                      />
                    )}
                  </div>
                </div>
              )
            })}
            <input className="input-type-button" onClick={addTag} type="button" value="+" />
          </div>
        </form>

        <div className="flexRow spaceBetween">
          <Link to="/recipes">
            <button>Retour</button>
          </Link>
          <button type="submit">Suivant</button>
        </div>
      </div>
    </>
  )
}
