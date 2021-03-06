import React from 'react'
import searchIcon from '../../assets/icons/search.svg'

import '../../sass/components/_Search.scss'

export default function Search(props) {
  const {
    className,
    parent,
    handleSearchInput,
    isSearchboxActive,
    placeholder,
    toggleSearchbox,
    value
  } = props

  return (
    <>
      <div className={`search-container ${className}`}>
        <img
          onClick={toggleSearchbox}
          className="icon search-icon"
          src={searchIcon}
          alt={`search in ${parent}`}
        />
        <input
          type="search"
          id={`${parent}--search-input`}
          value={value || ''}
          onChange={e => handleSearchInput(e)}
          className={isSearchboxActive ? 'search-input' : 'search-input inactive'}
          disabled={isSearchboxActive && false}
          placeholder={placeholder ? placeholder : null}
        />
      </div>
    </>
  )
}
