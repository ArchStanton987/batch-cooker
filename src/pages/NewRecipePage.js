import React from 'react'

import RecipeForm from '../components/forms/RecipeForm'

export default function NewRecipePage(props) {
  const { UserId } = props

  const defaultRecipeInfo = {
    creatorId: UserId,
    name: '',
    image: '',
    url: '',
    content: '',
    guests: ''
  }
  const defaultIngredient = { name: '', category: '', quantity: 0, unit: '' }
  const defaultTag = { tagname: '' }

  return (
    <>
      <div className="new-recipe page">
        <h2>Créer une recette</h2>
        <RecipeForm
          isNewRecipe={true}
          recipeInfo={defaultRecipeInfo}
          ingredients={[defaultIngredient]}
          tags={[defaultTag]}
        />
      </div>
    </>
  )
}
