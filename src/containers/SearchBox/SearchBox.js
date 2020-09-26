import React from 'react'

import './SearchBox.css'
import magnifyingGlass from '../../assets/img/magnifying-glass.png'

export default function SearchBox() {
  return (
    <div className='searchbox-container'>
      <label className='searchbox-label'></label>
      <textarea className='searchbox-input'></textarea>
      <img className='search-icon' src={magnifyingGlass} alt='loupe'/>
    </div>
  )
}
