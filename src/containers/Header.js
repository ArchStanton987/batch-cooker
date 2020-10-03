import React from 'react'
import { Link } from 'react-router-dom'
import homeIcon from '../assets/img/home-icon.png'
import searchIcon from '../assets/img/search.svg'
import menuIcon from '../assets/img/burger.svg'
import '../sass/layout/_Header.scss'

export default function Header({ toggleFunction, setMenu, setSearchBox }) {
  return (
    <header className="header">
      <Link id="homeIcon-link" to="/">
        <img className="header_icon" src={homeIcon} alt="home" />
      </Link>
      <h1>BatchCooker</h1>
      <img
        onClick={() => toggleFunction(setSearchBox)}
        className="header_icon"
        src={searchIcon}
        alt="search"
      />
      <img
        className="header_icon"
        src={menuIcon}
        alt="menu"
        onClick={() => toggleFunction(setMenu)}
      />
    </header>
  )
}
