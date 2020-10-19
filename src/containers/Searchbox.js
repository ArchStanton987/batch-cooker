import React, { useState } from 'react'

import '../sass/components/_Searchbox.scss'
import searchIcon from '../assets/icons/search.svg'
import cross from '../assets/icons/x.svg'

export default function Searchbox({
  handleResetSearchInput,
  handleSearchInput,
  scrollableRef,
  toggleModal,
  parentName,
  placeholder
}) {
  const [isSearchboxActive, setSearchbox] = useState(false)
  const toggleSearchbox = () => setSearchbox(prevState => !prevState)

  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

  return (
    <>
      <div className="inventory-searchbox">
        <img
          onClick={toggleSearchbox}
          src={searchIcon}
          alt="search"
          className="inventory-searchbox_searchIcon"
        />
        <input
          type="text"
          id={`${parentName}-searchbox_search`}
          onChange={e => {
            handleSearchInput(e)
            scrollToRef(scrollableRef)
          }}
          onFocus={() => setTimeout(() => scrollToRef(scrollableRef), 500)}
          className={
            isSearchboxActive ? 'inventory-searchbox_input' : 'inventory-searchbox_input inactive'
          }
          disabled={isSearchboxActive && false}
          placeholder={placeholder ? placeholder : null}
        />
        <img
          onClick={handleResetSearchInput}
          className={
            isSearchboxActive
              ? 'inventory-searchbox_deleteIcon'
              : 'inventory-searchbox_deleteIcon inactive'
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
