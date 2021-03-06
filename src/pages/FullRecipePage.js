import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr'

import { useToggle } from '../lib/hooks/index'
import { parseFetchedFullRecipe } from '../lib/utils/recipes-utils'
import { fetchRecipe, deleteRecipe, saveRecipe } from '../lib/api/api-recipes'
import { putRecipeMenu } from '../lib/api/api-menu'
import '../sass/pages/_FullRecipe.scss'
import '../sass/components/_Ingredient.scss'
import Section from '../components/page_layout/Section'
import SectionCTA from '../components/page_layout/SectionCTA'
import SectionInfo from '../components/page_layout/SectionInfo'
import CTAButton from '../components/page_layout/CTAButton'
import favIconFullYellow from '../assets/icons/star-full-yellow.svg'
import favIconEmpty from '../assets/icons/star-empty-prim.svg'
import calendarIconPrim from '../assets/icons/calendar.svg'
import calendarIconSec from '../assets/icons/calendar-sec.svg'
import defaultPic from '../assets/images/chefhat.png'
import Modal from '../components/wrappers/Modal'

export default function FullRecipePage(props) {
  const [recipe, setRecipe] = useState({})
  const [isRecipeSaved, setIsRecipeSaved] = useState(false)
  const [isRecipeInMenu, setIsRecipeInMenu] = useState(false)
  const [isConfirmationVisible, setConfirmation] = useToggle(false)
  const [isError, setIsError] = useToggle(false)
  const [isSuccess, setIsSuccess] = useToggle(false)
  const [hasDeleted, setHasDeleted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const {
    name,
    ingredients,
    content,
    url,
    image,
    username,
    createdAt,
    updatedAt,
    guests,
    Tags
  } = recipe

  const RecipeId = props.match.params.id
  const { hasUserLogged, UserId } = props

  moment.locale('fr')

  const handleFetchRecipe = useCallback(async () => {
    const result = await fetchRecipe(RecipeId)
    setIsRecipeSaved(result.data.isSavedByUser)
    setIsRecipeInMenu(result.data.isInMenu)
    const parsedResults = parseFetchedFullRecipe(result.data.recipe)
    setRecipe(parsedResults)
  }, [RecipeId])

  const handleDeleteRecipe = async () => {
    try {
      const res = await deleteRecipe(RecipeId)
      setIsSuccess()
      setHasDeleted(true)
      setSuccessMessage(res.data.message)
    } catch (err) {
      setIsError()
      setErrorMessage(err.response.data.error)
    }
  }

  const handleSaveRecipe = async () => {
    try {
      let res = await saveRecipe(RecipeId, UserId)
      setIsRecipeSaved(prev => !prev)
      setIsSuccess()
      setSuccessMessage(res.data.message)
    } catch (err) {
      setIsError()
      setErrorMessage(err.response.data.error)
    }
  }

  const handlePutToMenu = async () => {
    try {
      let res = await putRecipeMenu(RecipeId, UserId)
      setIsRecipeInMenu(prev => !prev)
      setIsSuccess()
      setSuccessMessage(res.data.message)
    } catch (err) {
      setIsError()
      setErrorMessage(err.response.data.error)
    }
  }

  useEffect(() => {
    handleFetchRecipe()
  }, [handleFetchRecipe])

  return (
    <>
      <div className="full-recipe page">
        {isSuccess && (
          <Modal>
            <p>{successMessage}</p>
            <SectionInfo className="no-border">
              {hasDeleted ? (
                <Link to="/myrecipes">
                  <CTAButton action={setIsSuccess}>OK</CTAButton>
                </Link>
              ) : (
                <CTAButton action={setIsSuccess}>OK</CTAButton>
              )}
            </SectionInfo>
          </Modal>
        )}
        {isError && (
          <Modal>
            <p>{errorMessage}</p>
            <SectionInfo className="no-border">
              <CTAButton action={setIsError}>OK</CTAButton>
            </SectionInfo>
          </Modal>
        )}
        {isConfirmationVisible && (
          <Modal>
            <p>Voulez vous vraiment supprimer cette recette ?</p>
            <SectionCTA className="no-border">
              <CTAButton action={setConfirmation}>Annuler</CTAButton>
              <CTAButton
                action={() => {
                  setConfirmation()
                  handleDeleteRecipe()
                }}
              >
                Supprimer
              </CTAButton>
            </SectionCTA>
          </Modal>
        )}
        <h2>Recette</h2>
        <SectionCTA className={'no-border'}>
          {hasUserLogged && recipe && recipe.creatorId === UserId && (
            <>
              <Link to={{ pathname: `/myrecipes/edit/${RecipeId}`, recipe: { ...recipe } }}>
                <CTAButton className={'secondary'}>Modifier</CTAButton>
              </Link>
              <CTAButton action={setConfirmation} className={'secondary'}>
                Supprimer
              </CTAButton>
            </>
          )}
          {hasUserLogged && recipe && isRecipeSaved && (
            <CTAButton action={handleSaveRecipe} className={'secondary'}>
              <img
                className="icon cta-button--icon"
                src={favIconEmpty}
                alt="retirer de mes favoris"
              />
              Retirer de mes favoris
            </CTAButton>
          )}
          {hasUserLogged && recipe && !isRecipeSaved && (
            <CTAButton action={handleSaveRecipe} className={''}>
              <img
                className="icon cta-button--icon"
                src={favIconFullYellow}
                alt="add to favorites"
              />
              Ajouter à mes favoris
            </CTAButton>
          )}
          {hasUserLogged && recipe && !isRecipeInMenu && (
            <CTAButton action={handlePutToMenu} className={''}>
              <img className="icon cta-button--icon" src={calendarIconPrim} alt="add to menu" />
              Ajouter au menu
            </CTAButton>
          )}
          {hasUserLogged && recipe && isRecipeInMenu && (
            <CTAButton action={handlePutToMenu} className={'secondary'}>
              <img className="icon cta-button--icon" src={calendarIconSec} alt="add to menu" />
              Retirer du menu
            </CTAButton>
          )}
        </SectionCTA>
        <Section className={'recipe-header'}>
          <h3 className="header-title">{name}</h3>
          <div className="header-text">
            <p className="recipe-text">
              Auteur : <span>{username}</span>
            </p>
            <p className="recipe-text">le {moment(createdAt).format('LL')}</p>
            {createdAt !== updatedAt && (
              <p className="recipe-text">Edité le {moment(updatedAt).format('LL')}</p>
            )}
            <p className="recipe-text">Pour {guests} personne(s)</p>
          </div>
          <div className="recipe-img-container">
            <img
              src={image ? image : defaultPic}
              className="recipe-img"
              alt={image ? name : 'cooking hat'}
            />
          </div>
          <div className="header-tags">
            <ul className="taglist">
              {Tags &&
                Tags.map(tag => (
                  <li key={`RecipeId-${RecipeId}-TagId-${tag.TagRecipe.TagId}`}>
                    <p>{`#${tag.tagname}`}</p>
                  </li>
                ))}
            </ul>
          </div>
        </Section>
        <div className="section-container">
          <h3>Ingrédients</h3>
          <ul className="recipe-ingredient-list">
            {ingredients &&
              ingredients.map(ingredient => (
                <li className="ingredient-item" key={`IngredientId-${ingredient.IngredientId}-RecipeId-${ingredient.RecipeId}`}>
                  <p className="name">{ingredient.name}</p>
                  <p className="quantity">{ingredient.quantity}</p>
                  <p className="unit"> {ingredient.unit}</p>
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
          <p className="recipe-text">Cette fonctionnalité n'est pas encore implémentée.</p>
        </div>
      </div>
    </>
  )
}
