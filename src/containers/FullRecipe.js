import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function FullRecipe(props) {
  const [recipe, setRecipe] = useState(props.location.recipe || false)

  const { name, ingredients, content } = recipe

  const getRecipeData = () => {
    const recipeId = props.match.params.id

    const url = `http://192.168.1.27:8000/api/recipes/${recipeId}`
    axios.get(url).then(res => 
      setRecipe(res.data))
  }

  useEffect(() => {
    if (!recipe) {
      getRecipeData()
    }
  }, [])

  return (
    <>
      <h2>Recette : {name}</h2>
      <ul>
        {ingredients &&
          ingredients.map(ingredient => (
            <li>{`${ingredient.name} ${ingredient.quantity} ${ingredient.unity}`}</li>
          ))}
      </ul>
      {content}
    </>
  )
}
