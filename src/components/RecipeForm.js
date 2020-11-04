import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../sass/pages/_NewRecipe.scss'
import plusIcon from '../assets/icons/plus.svg'
import {
  postRecipeInfo,
  postTags,
  postIngredients,
  updateRecipeInfo,
  updateIngredients,
  updateTags
} from '../lib/recipes'
import DynamicFormIngredient from '../components/DynamicFormIngredient'
import DynamicFormTags from '../components/DynamicFormTags'
import Section from '../components/Section'
import SectionCTA from '../components/SectionCTA'
import CTAButton from '../components/CTAButton'
import Modal from '../components/Modal'

export default function RecipeForm(props) {
  const { recipeInfo, ingredients, tags, recipeId } = props

  const [newRecipeInfo, setRecipeInfo] = useState(recipeInfo)
  const [newIngredients, setIngredients] = useState(ingredients)
  const [newTags, setTags] = useState(tags)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const defaultIngredient = { name: '', category: '', quantity: 0, unity: '' }
  const defaultTag = { tagname: '' }

  const resetDefault = () => {
    setSuccess(false)
    setSuccessMessage('')
    setIsError(false)
    setErrorMessage('')
  }

  // ingredient handlers
  const addIngredient = () => {
    if (newIngredients.length < 12) {
      setIngredients([...newIngredients, { ...defaultIngredient }])
    }
  }
  const removeIngredient = index => {
    const ingredientList = [...newIngredients]
    ingredientList.splice(index, 1)
    setIngredients(ingredientList)
  }
  const handleIngredientChange = (e, index) => {
    const { name, value } = e.currentTarget
    const ingredientList = [...newIngredients]
    ingredientList[index][name] = value
    setIngredients(ingredientList)
  }

  // Tag handlers
  const addTag = () => {
    if (newTags.length < 4) {
      setTags([...newTags, { ...defaultTag }])
    }
  }
  const removeTag = index => {
    const tagList = [...newTags]
    tagList.splice(index, 1)
    setTags(tagList)
  }
  const handleTagChange = (e, index) => {
    const tagList = [...newTags]
    tagList[index].tagname = e.currentTarget.value
    setTags(tagList)
  }

  // Recipe handlers
  const handleChangeNewRecipeInfo = e => {
    setRecipeInfo({
      ...newRecipeInfo,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handlePostNewRecipe = async () => {
    const res = await postRecipeInfo(newRecipeInfo)
    const newRecipeId = res.data.recipeId
    postIngredients(newRecipeId, newIngredients)
    postTags(newRecipeId, newTags)
    return res
  }

  const handleUpdateRecipe = async () => {
    const res = await Promise.all([
      updateRecipeInfo(recipeId, newRecipeInfo),
      updateIngredients(recipeId, newIngredients),
      updateTags(recipeId, newTags)
    ])
    return res
  }

  const handleRecipeSubmit = async e => {
    e.preventDefault()
    try {
      let res
      if (recipeId) {
        res = await handleUpdateRecipe()
      } else {
        res = await handlePostNewRecipe()
      }
      return setTimeout(() => {
        setSuccess(true)
        setSuccessMessage(res.data.message)
      }, 500)
    } catch (err) {
      if (err.response) {
        setIsError(true)
        setErrorMessage('Raté')
      } else {
        setIsError(true)
        setErrorMessage(err)
        console.log(err)
      }
    }
  }

  useEffect(() => {
    setRecipeInfo(recipeInfo)
    setIngredients(ingredients)
    setTags(tags)
  }, [recipeInfo, ingredients, tags])

  return (
    <>
      {success && (
        <Modal title={'Recette créée'} parent={'recipe-form'}>
          <Section className="no-border">
            Votre recette a bien été créée, Vous pouvez la retrouver dans la page "mes recettes".
            {successMessage}
          </Section>
          <SectionCTA className="no-border">
            <Link to="/myrecipes">
              <CTAButton action={resetDefault}>OK</CTAButton>
            </Link>
          </SectionCTA>
        </Modal>
      )}

      {isError && (
        <Modal
          handleClose={() => {
            setIsError(false)
            setErrorMessage('')
          }}
          title="Erreur"
        >
          {errorMessage}
        </Modal>
      )}

      <form onSubmit={handleRecipeSubmit} className="new-recipe-form" method="post">
        <Section className={'new-recipe'}>
          <h3>Votre recette</h3>
          <label className="recipe-form--label" htmlFor="name">
            <p>Nom de la recette</p>
          </label>
          <input
            className="recipe-form--input"
            onChange={handleChangeNewRecipeInfo}
            type="text"
            name="name"
            value={newRecipeInfo.name || ''}
            required
            autoFocus
          />
          <label className="recipe-form--label" htmlFor="guests">
            <p>Nombre de couverts</p>
          </label>
          <input
            className="recipe-form--input"
            onChange={handleChangeNewRecipeInfo}
            type="number"
            name="guests"
            value={newRecipeInfo.guests || ''}
            required
          />
          <label className="recipe-form--label" htmlFor="image">
            <p>Image</p>
          </label>
          <input
            className="recipe-form--input"
            onChange={handleChangeNewRecipeInfo}
            type="text"
            name="image"
            value={newRecipeInfo.image || ''}
          />
          <label className="recipe-form--label" htmlFor="url">
            <p>Lien vers ressource extérieure</p>
          </label>
          <input
            className="recipe-form--input"
            onChange={handleChangeNewRecipeInfo}
            type="text"
            name="url"
            value={newRecipeInfo.url || ''}
          />
          <label className="recipe-form--label" htmlFor="content">
            <p>Préparation</p>
          </label>
          <textarea
            onChange={handleChangeNewRecipeInfo}
            className="new-recipe-content"
            id="content"
            name="content"
            value={newRecipeInfo.content || ''}
          />
        </Section>
        <Section className={'new-recipe'}>
          <h3>Associer les ingrédients (maximum : 12)</h3>
          <ul className="flexColumn justifyCenter">
            {newIngredients &&
              newIngredients.map((ingredient, i) => {
                return (
                  <DynamicFormIngredient
                    key={`new-ingredient-${i + 1}`}
                    ingredient={ingredient}
                    index={i}
                    handleIngredientChange={handleIngredientChange}
                    removeIngredient={removeIngredient}
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
        <Section className={'new-recipe'}>
          <h3>Associer des tags (maximum : 4)</h3>
          <ul>
            {newTags &&
              newTags.map((tag, i) => (
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
        <SectionCTA className={'no-border'}>
          <Link to="/recipes">
            <CTAButton className={'secondary'}>Retour</CTAButton>
          </Link>
          <button type="submit">Enregistrer</button>
        </SectionCTA>
      </form>
    </>
  )
}
