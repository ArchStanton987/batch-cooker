import React from 'react'
import CTAButton from '../components/CTAButton'
import SectionCTA from '../components/SectionCTA'

import '../sass/components/_IngredientForm.scss'

export default function IngredientForm({
  toggleModal,
  handleNewIngredient,
  handleSubmitIngredient,
  ...props
}) {
  const { ingredientId, name, category, quantity, unity } = props
  return (
    <>
      <form className="flexColumn" method="post">
        <label htmlFor="name">
          <p>Nom</p>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={name}
            onChange={e => handleNewIngredient(e)}
            autoFocus
            required
          />
        </label>
        <label htmlFor="category"><p>Catégorie</p></label>
        <select
          defaultValue={category}
          onChange={e => handleNewIngredient(e)}
          id="category"
          name="category"
          required
        >
          <option value="">Choisissez la catégorie</option>
          <option value="fruits et légumes">fruits et légumes</option>
          <option value="viandes et poissons">viandes et poissons</option>
          <option value="produits laitiers">produits laitiers</option>
          <option value="assaisonnements et condiments">assaisonnements et condiments</option>
          <option value="céréales et féculents">céréales et féculents</option>
          <option value="sucrés">sucrés</option>
          <option value="autres">autres</option>
        </select>
        <div className="flexRow spaceBetween">
          <div className="smaller-input-container">
            <label htmlFor="quantity">
              <p>Quantité</p>
            </label>
            <input
              onChange={e => handleNewIngredient(e)}
              id="quantity"
              name="quantity"
              type="number"
              defaultValue={quantity}
            />
          </div>
          <div className="smaller-input-container">
            <label htmlFor="unity">
              <p>Unité</p>
            </label>
            <input
              placeholder="ex : g, kg, cl, l, part"
              onChange={e => handleNewIngredient(e)}
              id="unity"
              name="unity"
              type="text"
              defaultValue={unity}
            />
          </div>
        </div>
        <SectionCTA className="no-border">
          <CTAButton action={toggleModal} className="secondary">
            Annuler
          </CTAButton>
          <CTAButton
            action={e => {
              ingredientId ? handleSubmitIngredient(e, true) : handleSubmitIngredient(e, false)
            }}
          >
            Enregistrer
          </CTAButton>
        </SectionCTA>
      </form>
    </>
  )
}
