import React from 'react'

import '../sass/components/_InventoryModal.scss'

export default function InventoryModal({
  toggleModal,
  handleNewIngredient,
  handleSubmitIngredient
}) {
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
              onChange={e => handleNewIngredient(e)}
              id="name"
              name="name"
              type="text"
              required
            ></input>
            <label htmlFor="category">Catégorie :</label>
            <select onChange={e => handleNewIngredient(e)} id="category" name="category" required>
              <option value="">Choisissez la catégorie</option>
              <option value="fruits et légumes">fruits et légumes</option>
              <option value="viandes et poissons">viandes et poissons</option>
              <option value="produits laitiers">produits laitiers</option>
              <option value="assaisonnements et condiments">assaisonnements et condiments</option>
              <option value="céréales et féculents">céréales et féculents</option>
              <option value="sucrés">sucrés</option>
              <option value="autre">autre</option>
            </select>
            <label htmlFor="quantity">Quantité :</label>
            <input
              onChange={e => handleNewIngredient(e)}
              id="quantity"
              name="quantity"
              type="number"
            ></input>
            <label htmlFor="unity">Unité :</label>
            <input
              onChange={e => handleNewIngredient(e)}
              id="unity"
              name="unity"
              type="text"
            ></input>
            <div className="flexRow spaceBetween">
              <button onClick={toggleModal} id="cancel-submit-ingredient">
                Annuler
              </button>
              <button onClick={(e) => handleSubmitIngredient(e)} id="submit-ingredient" type="submit">
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
