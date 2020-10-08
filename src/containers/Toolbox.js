import React, { useState } from 'react'

import '../sass/components/_Toolbox.scss'
import searchIcon from '../assets/icons/search.svg'
import cross from '../assets/icons/x.svg'

export default function Toolbox({
  handleResetSearchInput,
  handleSearchInput,
  scrollableRef,
  toggleModal,
  parentName
}) {
  const [isToolboxActive, setToolbox] = useState(false)

  const toggleToolbox = () => setToolbox(prevState => !prevState)

  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

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
          id={`${parentName}-toolbox_search`}
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
