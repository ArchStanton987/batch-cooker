import React from 'react'
import { Link } from 'react-router-dom'
import homeIcon from '../assets/icons/home-icon.png'
import menuIcon from '../assets/icons/burger.svg'
import '../sass/layout/_Header.scss'

export default function Header({ setMenu }) {
  return (
    <header className="header mobile-only">
      <Link id="homeIcon-link" to="/">
        <img className="header--icon icon" src={homeIcon} alt="home" />
      </Link>
      <h1>BatchCooker</h1>
      <img
        className="header--icon icon"
        src={menuIcon}
        alt="menu"
        onClick={() => setMenu()}
      />
    </header>
  )
}
