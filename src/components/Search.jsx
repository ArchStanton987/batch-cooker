import React from 'react'
import searchIcon from '../assets/icons/search.svg'

import '../sass/components/_Search.scss'

export default function Search(props) {
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)
  const {
    className,
    parent,
    handleSearchInput,
    scrollableRef,
    isSearchboxActive,
    placeholder,
    toggleSearchbox
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
          onChange={e => {
            handleSearchInput(e)
            // scrollableRef && scrollToRef(scrollableRef)
          }}
          // onFocus={() => setTimeout(() => scrollToRef(scrollableRef), 500)}
          className={isSearchboxActive ? 'search-input' : 'search-input inactive'}
          disabled={isSearchboxActive && false}
          placeholder={placeholder ? placeholder : null}
        />
      </div>
    </>
  )
}
