import React from 'react'

import '../sass/components/_Toolbox.scss'
import searchIcon from '../assets/img/search.svg'
import cross from '../assets/img/x.svg'

export default function Toolbox({
  toggleToolbox,
  isToolboxActive,
  handleResetSearchInput,
  toggleModal,
  scrollToRef,
  handleSearchInput,
  scrollableRef
}) {
  return (
    <>
      <div className="inventory-toolbox">
        <img
          onClick={toggleToolbox}
          src={searchIcon}
          alt="search"
          className="inventory-toolbox_searchIcon"
        />
        <input
          type="text"
          id="inventory-toolbox_search"
          onChange={e => {
            handleSearchInput(e)
            scrollToRef(scrollableRef)
          }}
          onFocus={() => setTimeout(() => scrollToRef(scrollableRef), 500)}
          className={
            isToolboxActive ? 'inventory-toolbox_input' : 'inventory-toolbox_input inactive'
          }
          disabled={isToolboxActive && false}
        />
        <img
          onClick={handleResetSearchInput}
          className={
            isToolboxActive
              ? 'inventory-toolbox_deleteIcon'
              : 'inventory-toolbox_deleteIcon inactive'
          }
          alt="delete search"
          src={cross}
        />
        <button onClick={toggleModal} className="inventory-ingredients_add-button">
          Ajouter
        </button>
      </div>
    </>
  )
}
