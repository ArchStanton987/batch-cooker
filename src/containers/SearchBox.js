import React from 'react'

import '../sass/components/_SearchBox.scss'
import magnifyingGlass from '../assets/img/magnifying-glass.png'
import cross from '../assets/img/x.svg'

export default function SearchBox({ handleResetSearchInput, handleSearchInput }) {
  return (
    <div className="searchbox-container">
      <img className="searchbox-icon" src={magnifyingGlass} alt="loupe" />
      <input id="searchboxInput" onChange={handleSearchInput} className="searchbox-input"></input>
      <img
        onClick={handleResetSearchInput}
        className="searchbox__deleteIcon"
        alt="delete search"
        src={cross}
      />
    </div>
  )
}
