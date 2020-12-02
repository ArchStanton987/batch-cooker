import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../../sass/pages/_NewRecipe.scss'
import plusIcon from '../../assets/icons/plus.svg'
import {
  postRecipeInfo,
  postTags,
  postIngredients,
  saveRecipe,
  updateRecipeInfo,
  updateIngredients,
  updateTags
} from '../../lib/api/api-recipes'

import DynamicFormIngredient from './DynamicFormIngredient'
import DynamicFormTags from './DynamicFormTags'
import Section from '../page_layout/Section'
import SectionInfo from '../page_layout/SectionInfo'
import SectionCTA from '../page_layout/SectionCTA'
import CTAButton from '../page_layout/CTAButton'
import Modal from '../wrappers/Modal'

export default function RecipeForm(props) {
  const { recipeInfo, ingredients, tags, RecipeId } = props

  const [newRecipeInfo, setRecipeInfo] = useState(recipeInfo)
  const [newIngredients, setIngredients] = useState(ingredients)
  const [newTags, setTags] = useState(tags)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [hasCreated, setHasCreated] = useState(false)

  const defaultIngredient = { name: '', category: '', quantity: 0, unit: '' }
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

  const parseInput = values => {
    let newValues = values.filter(value => {
      if (value.tagname === '' || value.tagname.trim() === '') {
        return false
      } else {
        return true
      }
    })
    return newValues
  }

  const handlePostNewRecipe = async () => {
    const trimedTags = await parseInput(newTags)
    const res = await postRecipeInfo(newRecipeInfo)
    setHasCreated(true)
    const newRecipeId = res.data.RecipeId
    postIngredients(newRecipeId, newIngredients)
    postTags(newRecipeId, trimedTags)
    return res
  }

  const handleUpdateRecipe = async () => {
    const res = await Promise.all([
      updateRecipeInfo(RecipeId, newRecipeInfo),
      updateIngredients(RecipeId, newIngredients),
      updateTags(RecipeId, newTags)
    ])
    return res
  }

  const handleSaveRecipe = async RecipeId => {
    try {
      await saveRecipe(RecipeId, newRecipeInfo.creatorId)
    } catch (err) {
      setIsError()
      setErrorMessage(err.response.data.error)
    }
  }

  const handleRecipeSubmit = async e => {
    e.preventDefault()
    try {
      let res
      if (RecipeId) {
        res = await handleUpdateRecipe()
        setSuccess(true)
        setSuccessMessage(res[0].data.message)
      } else {
        res = await handlePostNewRecipe()
        await handleSaveRecipe(res.data.RecipeId)
        setSuccess(true)
        setSuccessMessage(res.data.message)
      }
    } catch (err) {
      if (err.response) {
        setIsError(true)
        setErrorMessage(err.response.data.error)
      }
      if (err) {
        setIsError(true)
        setErrorMessage("Erreur lors de l'enregistrement de la recette.")
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
        <Modal title={'Recette enregistrée'} parent={'recipe-form'}>
          <Section className="no-border">
            {successMessage}{' '}
            {hasCreated &&
              `Elle a été ajoutée automatiquement dans votre carnet de recettes. Vous
            pouvez la retrouver dans la page "Mes Recettes"`}
          </Section>
          <SectionInfo className="no-border">
            <Link to="/myrecipes">
              <CTAButton action={resetDefault}>OK</CTAButton>
            </Link>
          </SectionInfo>
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
          <Link to="/home">
            <CTAButton className={'secondary'}>Annuler</CTAButton>
          </Link>
          <button type="submit">Enregistrer</button>
        </SectionCTA>
      </form>
    </>
  )
}
