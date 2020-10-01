import React from 'react'
import { Link } from 'react-router-dom'
import homeIcon from '../assets/img/home-icon.png'
import searchIcon from '../assets/img/search.svg'
import '../sass/layout/_Header.scss'

export default function Header({ toggleSearchBox, isSearchBoxActive }) {
  return (
    <header className="header">
      <Link id="homeIcon-link" to="/">
        <img id="homeIcon" src={homeIcon} alt="home" />
      </Link>
      <h1>BatchCooker</h1>
      <img onClick={() => toggleSearchBox()} className="searchIcon" src={searchIcon} alt="search" />
    </header>
  )
}
