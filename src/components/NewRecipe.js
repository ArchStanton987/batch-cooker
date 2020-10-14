import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import '../sass/pages/_NewRecipe.scss'
import minusIcon from '../assets/icons/minus.svg'
import plusIcon from '../assets/icons/plus.svg'
import { postNewIngredient, postNewRecipe, postNewTag } from '../lib/recipies'

export default function NewRecipe() {
  const initialValue = {
    creatorId: 1,
    name: '',
    image: null,
    url: null,
    content: '',
    guests: null
  }

  const defaultIngredient = { name: '', category: '', quantity: 0, unity: '' }
  const defaultTag = { tagname: '' }

  const [newRecipe, setNewRecipe] = useState(initialValue)
  const [ingredients, setIngredients] = useState([{ ...defaultIngredient }])
  const [tags, setTags] = useState([{ ...defaultTag }])
  const [recipeSubmit, setRecipeSubmit] = useState(false)

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
    const { name, value } = e.currentTarget
    const ingredientList = [...ingredients]
    ingredientList[index][name] = value
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

  const handleIngredientsSubmit = async (recipeId, ingredients) => {
    ingredients.forEach(async ingredient => {
      try {
        const response = await postNewIngredient(recipeId, ingredient)
        console.log(response)
      } catch (err) {
        return <p>Erreur en enregistrant le {ingredient}</p>
      }
    })
  }
  const handleTagsSubmit = async (recipeId, tags) => {
    tags.forEach(async tag => {
      try {
        const response = await postNewTag(recipeId, tag)
        console.log(response)
      } catch (err) {
        return <p>Erreur en enregistrant le tag {tag}</p>
      }
    })
  }

  // Recipe handlers
  const handleChangeNewRecipe = e => {
    setNewRecipe({
      ...newRecipe,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  const handleRecipeSubmit = async e => {
    e.preventDefault()
    try {
      const response = await postNewRecipe(newRecipe)
      const newRecipeId = response.recipeId
      await handleIngredientsSubmit(newRecipeId, ingredients)
      await handleTagsSubmit(newRecipeId, tags)
      setTimeout(() => setRecipeSubmit(true), 500)
    } catch (err) {
      return <p>ERROR</p>
    }
  }

  return (
    <>
      {recipeSubmit && <Redirect to="/recipes" />}
      <div className="new-recipe page">
        <h2>Création de recette</h2>
        <form onSubmit={handleRecipeSubmit} className="new-recipe-form" method="post">
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
                  <li key={`new-ingredient-${i + 1}`} className="recipe-form--ingredient-container">
                    <p className="ingredient-number">{`Ingredient #${i + 1}`}</p>
                    <select
                      className="recipe-form--category"
                      onChange={e => handleIngredientChange(e, i)}
                      id="category"
                      name="category"
                      required
                    >
                      <option value="">Catégorie</option>
                      <option value="fruits et légumes">fruits et légumes</option>
                      <option value="viandes et poissons">viandes et poissons</option>
                      <option value="produits laitiers">produits laitiers</option>
                      <option value="assaisonnements et condiments">
                        assaisonnements et condiments
                      </option>
                      <option value="céréales et féculents">céréales et féculents</option>
                      <option value="sucrés">sucrés</option>
                      <option value="autres">autres</option>
                    </select>
                    <label className="ingredient-label" htmlFor={`ingredient-name-${i}`}>
                      <p>Nom</p>
                    </label>
                    <label className="ingredient-label" htmlFor={`ingredient-quantity-${i}`}>
                      <p>Quantité</p>
                    </label>
                    <label className="ingredient-label" htmlFor={`ingredient-unity-${i}`}>
                      <p>Unité</p>
                    </label>
                    <input
                      className="ingredient-input--name"
                      value={ingredient.name}
                      onChange={e => handleIngredientChange(e, i)}
                      type="text"
                      name="name"
                      id={`ingredient-name-${i}`}
                      required
                    />
                    <input
                      className="ingredient-input--quantity"
                      value={ingredient.quantity}
                      onChange={e => handleIngredientChange(e, i)}
                      type="number"
                      name="quantity"
                      id={`ingredient-quantity-${i}`}
                      required
                    />
                    <input
                      className="ingredient-input--unity"
                      value={ingredient.unity}
                      onChange={e => handleIngredientChange(e, i)}
                      type="text"
                      name="unity"
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
