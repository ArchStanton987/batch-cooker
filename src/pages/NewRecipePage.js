import React from 'react'

import RecipeForm from '../components/RecipeForm'

export default function NewRecipePage(props) {
  const { userId } = props

  const defaultRecipeInfo = {
    creatorId: userId,
    name: '',
    image: '',
    url: '',
    content: '',
    guests: ''
  }
  const defaultIngredient = { name: '', category: '', quantity: 0, unity: '' }
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
