import React from 'react'

import '../sass/components/_SearchBox.scss'
import magnifyingGlass from '../assets/img/magnifying-glass.png'

export default function SearchBox() {
  return (
    <div className='searchbox-container'>
      <label className='searchbox-label'></label>
      <input className='searchbox-input'></input>
      <img className='search-icon' src={magnifyingGlass} alt='loupe'/>
    </div>
  )
}
