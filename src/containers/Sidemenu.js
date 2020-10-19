import React from 'react'
import { NavLink } from 'react-router-dom'

import homeIcon from '../assets/icons/home-icon.png'
import recipesIcon from '../assets/icons/recipesIcon.png'
import calendarIcon from '../assets/icons/calendarIcon.png'
import inventoryIcon from '../assets/icons/shelf.png'
import shoplistIcon from '../assets/icons/shop-listIcon.png'
import '../sass/layout/_Sidemenu.scss'
import CloseIcon from '../components/CloseIcon'

export default function Sidemenu({ toggleFunction, setMenu, isSideMenuActive }) {
  return (
    <div className="sidemenu-container">
      <div className={isSideMenuActive ? 'sidemenu active' : 'sidemenu inactive'}>
        <CloseIcon
          parent={'sidemenu'}
          onClick={() => toggleFunction(setMenu)}
          className={'sidemenu--close-icon mobile-only'}
        />
        <h1 className="sidemenu--title desktop-only">BatchCooker</h1>
        <hr className="sidemenu--hr desktop-only" />
        <p className="sidemenu--username desktop-only">Username</p>
        <hr className="sidemenu--hr desktop-only" />
        <nav className="sidemenu--navlist">
          <NavLink activeClassName="active-link" onClick={() => toggleFunction(setMenu)} to="/home">
            <li>
              <img className="sidemenu--icon icon" src={homeIcon} alt="home" />
              <h2>Accueil</h2>
            </li>
          </NavLink>
          <NavLink activeClassName="active-link" onClick={() => toggleFunction(setMenu)} to="/menu">
            <li>
              <img className="sidemenu--icon icon" src={calendarIcon} alt="menu" />
              <h2>Menu</h2>
            </li>
          </NavLink>
          <NavLink
            activeClassName="active-link"
            onClick={() => toggleFunction(setMenu)}
            to="/recipes"
          >
            <li>
              <img className="sidemenu--icon icon" src={recipesIcon} alt="recipes" />
              <h2>Mes recettes</h2>
            </li>
          </NavLink>
          <NavLink
            activeClassName="active-link"
            onClick={() => toggleFunction(setMenu)}
            to="/inventory"
          >
            <li>
              <img className="sidemenu--icon icon" src={inventoryIcon} alt="inventory" />
              <h2>Inventaire</h2>
            </li>
          </NavLink>
          <NavLink
            activeClassName="active-link"
            onClick={() => toggleFunction(setMenu)}
            to="/shoplist"
          >
            <li>
              <img className="sidemenu--icon icon" src={shoplistIcon} alt="shopping list" />
              <h2>Liste de courses</h2>
            </li>
          </NavLink>
        </nav>
        <hr className="sidemenu--hr" />
        <h1 className="sidemenu--title mobile-only">BatchCooker</h1>
      </div>
    </div>
  )
}
