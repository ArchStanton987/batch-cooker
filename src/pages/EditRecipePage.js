import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'

import RecipeForm from '../components/forms/RecipeForm.js'
import { fetchRecipe } from '../lib/api/api-recipes'
import { parseFetchedFullRecipe } from '../lib/utils/recipes-utils'

export default function EditRecipePage() {
  const [recipe, setRecipe] = useState({})
  const params = useParams()
  const RecipeId = params.id

  const handleFetchRecipe = useCallback(async () => {
    const result = await fetchRecipe(RecipeId)
    const parsedResults = parseFetchedFullRecipe(result.data.recipe)
    setRecipe(parsedResults)
  }, [RecipeId])

  const recipeInfo = {
    creatorId: recipe.creatorId,
    name: recipe.name,
    image: recipe.image,
    url: recipe.url,
    content: recipe.content,
    guests: recipe.guests
  }

  useEffect(() => {
    handleFetchRecipe()
  }, [handleFetchRecipe])

  return (
    <>
      <div className="edit-recipe page">
        <h2>Modifier la recette</h2>
        {recipe && (
          <RecipeForm
            RecipeId={RecipeId}
            isNewRecipe={false}
            recipeInfo={recipeInfo}
            ingredients={recipe.ingredients}
            tags={recipe.Tags}
          />
        )}
      </div>
    </>
  )
}
