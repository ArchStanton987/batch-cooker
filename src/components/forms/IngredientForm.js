import React from 'react'
import CTAButton from '../page_layout/CTAButton'
import SectionCTA from '../page_layout/SectionCTA'

import '../../sass/components/_IngredientForm.scss'

export default function IngredientForm({
  toggleModal,
  handleNewIngredient,
  handleSubmitIngredient,
  ...props
}) {
  const { IngredientId, name, quantity, unit } = props
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
            <label htmlFor="unit">
              <p>Unité</p>
            </label>
            <input
              placeholder="ex : g, kg, cl, l, part"
              onChange={e => handleNewIngredient(e)}
              id="unit"
              name="unit"
              type="text"
              defaultValue={unit}
            />
          </div>
        </div>
        <SectionCTA className="no-border">
          <CTAButton action={toggleModal} className="secondary">
            Annuler
          </CTAButton>
          <CTAButton
            action={e => {
              IngredientId ? handleSubmitIngredient(e, true) : handleSubmitIngredient(e, false)
            }}
          >
            Enregistrer
          </CTAButton>
        </SectionCTA>
      </form>
    </>
  )
}
