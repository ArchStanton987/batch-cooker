import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/fr'

import { fetchRecipe, parseFetchedRecipe } from '../lib/recipies'
import '../sass/pages/_FullRecipe.scss'
import '../sass/components/_Ingredient.scss'
import Section from '../components/Section'
import SectionCTA from '../components/SectionCTA'
import CTAButton from '../components/CTAButton'
import favIconFullYellow from '../assets/icons/star-full-yellow.svg'
import calendarIcon from '../assets/icons/calendarIcon.png'
import defaultPic from '../assets/images/chefhat.png'

export default function FullRecipe(props) {
  const [recipe, setRecipe] = useState({})
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
      <div className="full-recipe page">
        <h2>Recette</h2>
        <SectionCTA className={'no-border'}>
          <CTAButton className={'secondary'}>Modifier</CTAButton>
          <CTAButton className={'secondary'}>Supprimer</CTAButton>
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
            <p className="recipe-text">Pour {guests} personnes</p>
            <p className="recipe-text">Note moy. : 5/10</p>
          </div>
          <div className="recipe-img-container">
            <img src={image ? image : defaultPic} className="recipe-img" alt={image ? name : "cooking hat"} />
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
