import React from 'react'

import '../sass/components/_InventoryModal.scss'

export default function InventoryModal({
  toggleModal,
  handleNewIngredient,
  handleSubmitIngredient,
  ...props
}) {
  const { ingredientId, name, category, quantity, unity } = props
  return (
    <>
      <div className="inventory-modal-overlay">
        <form method="post">
          <div className="ingredient-box">
            <span onClick={toggleModal} className="closing-cross">
              &#10005;
            </span>
            <h4>Ajouter / modifier un ingrédient</h4>
            <label htmlFor="name">Nom :</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={name}
              onChange={e => handleNewIngredient(e)}
              required
            ></input>
            <label htmlFor="category">Catégorie :</label>
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
            <label htmlFor="quantity">Quantité :</label>
            <input
              onChange={e => handleNewIngredient(e)}
              id="quantity"
              name="quantity"
              type="number"
              defaultValue={quantity}
            ></input>
            <label htmlFor="unity">Unité :</label>
            <input
              placeholder="ex : g, kg, cl, l, part"
              onChange={e => handleNewIngredient(e)}
              id="unity"
              name="unity"
              type="text"
              defaultValue={unity}
            ></input>
            <div className="flexRow spaceBetween">
              <button onClick={toggleModal} id="cancel-submit-ingredient">
                Annuler
              </button>
              <button
                autoFocus={true}
                onClick={e => {
                  ingredientId ? handleSubmitIngredient(e, true) : handleSubmitIngredient(e, false)
                }}
                id="submit-ingredient"
                type="submit"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
