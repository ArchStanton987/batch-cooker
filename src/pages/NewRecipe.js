import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import '../sass/pages/_NewRecipe.scss'
import plusIcon from '../assets/icons/plus.svg'
import { postNewIngredient, postNewRecipe, postNewTag } from '../lib/recipies'
import DynamicFormIngredient from '../components/DynamicFormIngredient'
import DynamicFormTags from '../components/DynamicFormTags'
import Section from '../components/Section'
import SectionCTA from '../components/SectionCTA'
import CTAButton from '../components/CTAButton'

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
        await postNewIngredient(recipeId, ingredient)
      } catch (err) {
        return <p>Erreur en enregistrant le {ingredient}. {err}</p>
      }
    })
  }
  const handleTagsSubmit = async (recipeId, tags) => {
    tags.forEach(async tag => {
      try {
        await postNewTag(recipeId, tag)
      } catch (err) {
        return <p>Erreur en enregistrant le tag {tag}. {err}</p>
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
      return <p>{err}</p>
    }
  }

  return (
    <>
      {recipeSubmit && <Redirect to="/recipes" />}
      <div className="new-recipe page">
        <h2>Création de recette</h2>
        <form onSubmit={handleRecipeSubmit} className="new-recipe-form" method="post">
          <Section className={"new-recipe"}>
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
              <p>Préparation</p>
            </label>
            <textarea
              onChange={handleChangeNewRecipe}
              className="new-recipe-content"
              id="content"
              name="content"
            />
          </Section>
          <Section className={"new-recipe"}>
            <h3>Associer les ingrédients (maximum : 12)</h3>
            <ul className="flexColumn justifyCenter">
              {ingredients.map((ingredient, i) => {
                return (
                  <DynamicFormIngredient
                    key={`new-ingredient-${i + 1}`}
                    handleIngredientChange={handleIngredientChange}
                    removeIngredient={removeIngredient}
                    ingredient={ingredient}
                    index={i}
                  />
                )
              })}
            </ul>
            <img
              className="new-recipe--add-icon"
              src={plusIcon}
              alt="add ingredient"
              onClick={addIngredient}
            />
          </Section>
          <Section className={"new-recipe"}>
            <h3>Associer des tags (maximum : 4)</h3>
            <ul>
              {tags.map((tag, i) => (
                <DynamicFormTags
                  key={`tag-${i}`}
                  tag={tag}
                  index={i}
                  handleTagChange={handleTagChange}
                  removeTag={removeTag}
                />
              ))}
            </ul>
            <img className="new-recipe--add-icon" src={plusIcon} alt="add tag" onClick={addTag} />
          </Section>
          <SectionCTA className={"no-border"}>
            <Link to="/recipes">
              <CTAButton className={"secondary"}>Retour</CTAButton>
            </Link>
            <button type="submit">Enregistrer</button>
          </SectionCTA>
        </form>
      </div>
    </>
  )
}
