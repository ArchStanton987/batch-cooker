import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr'

import { useToggle } from '../lib/hooks/index'
import { parseFetchedRecipe } from '../lib/utils/recipes-utils'
import { fetchRecipe, deleteRecipe } from '../lib/api/api-recipes'
import '../sass/pages/_FullRecipe.scss'
import '../sass/components/_Ingredient.scss'
import Section from '../components/page_layout/Section'
import SectionCTA from '../components/page_layout/SectionCTA'
import SectionInfo from '../components/page_layout/SectionInfo'
import CTAButton from '../components/page_layout/CTAButton'
import favIconFullYellow from '../assets/icons/star-full-yellow.svg'
import calendarIcon from '../assets/icons/calendarIcon.png'
import defaultPic from '../assets/images/chefhat.png'
import Modal from '../components/wrappers/Modal'

export default function FullRecipePage(props) {
  const [recipe, setRecipe] = useState({})
  const [isConfirmationVisible, setConfirmation] = useToggle(false)
  const [isError, setIsError] = useToggle(false)
  const [isSuccess, setIsSuccess] = useToggle(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [hasRightsOnRecipe, setRightsOnRecipe] = useState(false)
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

  const recipeId = props.match.params.id
  const userId = props.userId

  moment.locale('fr')

  const handleFetchRecipe = useCallback(async () => {
    const result = await fetchRecipe(recipeId)
    const parsedResults = parseFetchedRecipe(result.data)
    setRecipe(parsedResults)
    setRightsOnRecipe(checkRightsOnRecipe(recipe.creatorId, userId))
  }, [recipe.creatorId, userId, recipeId])

  const handleDeleteRecipe = async () => {
    try {
      const res = await deleteRecipe(recipeId)
      setIsSuccess()
      setSuccessMessage(res.data.message)
    } catch (err) {
      setIsError()
      setErrorMessage(err.response.data.error)
    }
  }

  const checkRightsOnRecipe = (recipe, userId) => {
    return recipe?.creatorId === userId ? true : false
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
              <Link to="/myrecipes">
                <CTAButton action={setIsSuccess}>OK</CTAButton>
              </Link>
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
          {hasRightsOnRecipe && (
            <>
              <Link to={{ pathname: `/myrecipes/edit/${recipeId}`, recipe: { ...recipe } }}>
                <CTAButton className={'secondary'}>Modifier</CTAButton>
              </Link>
              <CTAButton action={setConfirmation} className={'secondary'}>
                Supprimer
              </CTAButton>
            </>
          )}
          <CTAButton className={''}>
            <img className="icon cta-button--icon" src={favIconFullYellow} alt="add to favorites" />
            Ajouter à mon carnet
          </CTAButton>
          <CTAButton className={''}>
            <img className="icon cta-button--icon" src={calendarIcon} alt="add to menu" />
            Ajouter au menu
          </CTAButton>
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
            <p className="recipe-text">Note moy. : 5/10</p>
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
                  <li key={`recipeId-${recipeId}-tagId-${tag.TagRecipe.tagId}`}>
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
    </>
  )
}
