import React from 'react'
import { Link } from 'react-router-dom'

import homeIcon from '../assets/icons/home-icon.png'
import recipesIcon from '../assets/icons/recipesIcon.png'
import calendarIcon from '../assets/icons/calendarIcon.png'
import inventoryIcon from '../assets/icons/shelf.png'
import shoplistIcon from '../assets/icons/shop-listIcon.png'
import closeIcon from '../assets/icons/x-white.svg'
import '../sass/layout/_Menu.scss'

export default function Menu({ toggleFunction, setMenu, isSideMenuActive }) {
  return (
    <div className={isSideMenuActive ? 'sidemenu active' : 'sidemenu inactive'}>
      <img
        className="sidemenu_close-icon"
        src={closeIcon}
        alt="close menu"
        onClick={() => toggleFunction(setMenu)}
      />
      <ul className="sidemenu_list">
        <Link onClick={() => toggleFunction(setMenu)} to="/">
          <li>
            <img className="sidemenu_icon" src={homeIcon} alt="home" />
            Accueil
          </li>
        </Link>
        <Link onClick={() => toggleFunction(setMenu)} to="/calendar">
          <li>
            <img className="sidemenu_icon" src={calendarIcon} alt="calendar" />
            Calendrier
          </li>
        </Link>
        <Link onClick={() => toggleFunction(setMenu)} to="/recipes">
          <li>
            <img className="sidemenu_icon" src={recipesIcon} alt="recipes" />
            Recettes
          </li>
        </Link>
        <Link onClick={() => toggleFunction(setMenu)} to="/inventory">
          <li>
            <img className="sidemenu_icon" src={inventoryIcon} alt="inventory" />
            Inventaire
          </li>
        </Link>
        <Link onClick={() => toggleFunction(setMenu)} to="/shoplist">
          <li>
            <img className="sidemenu_icon" src={shoplistIcon} alt="shopping list" />
            Liste de courses
          </li>
        </Link>
      </ul>
      <hr className="sidemenu_hr" />
      <h1 className="sidemenu_title">BatchCooker</h1>
    </div>
  )
}
