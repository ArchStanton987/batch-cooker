import React from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

import homeIcon from '../assets/icons/home-icon.png'
import recipesIcon from '../assets/icons/recipesIcon.png'
import calendarIcon from '../assets/icons/calendarIcon.png'
import inventoryIcon from '../assets/icons/shelf.png'
import shoplistIcon from '../assets/icons/shop-listIcon.png'
import powerIcon from '../assets/icons/power.svg'
import userIcon from '../assets/icons/user.svg'
import '../sass/layout/_Sidemenu.scss'
import CloseIcon from '../components/page_layout/CloseIcon'

export default function Sidemenu({ ...props }) {
  const { setMenu, isSideMenuActive, handleDisconnect, hasUserLogged, userName } = props

  let location = useLocation()

  return (
    <div className="sidemenu-container">
      <div className={isSideMenuActive ? 'sidemenu active' : 'sidemenu inactive'}>
        <CloseIcon
          parent={'sidemenu'}
          onClick={() => setMenu()}
          className={'sidemenu--close-icon mobile-only'}
        />

        <NavLink
          onClick={() => {
            setMenu()
            if (location.pathname === '/' || location.pathname === '/home') {
              window.location.reload()
            }
          }}
          to="/home"
        >
          <h1>Batch Cooker</h1>
        </NavLink>
        <hr className="sidemenu--hr desktop-only" />
        <NavLink className="sidemenu--link mobile-only" onClick={() => setMenu()} to="/profile">
          {hasUserLogged && (
            <>
              <img className="icon" src={userIcon} alt="profil" />
              <p>{userName}</p>
            </>
          )}
        </NavLink>
        {!hasUserLogged && (
          <nav className="sidemenu--navlist desktop-only">
            <ul>
              <NavLink onClick={() => setMenu()} to="/login">
                <li>
                  <h2>Se connecter</h2>
                </li>
              </NavLink>
              <NavLink onClick={() => setMenu()} to="/register">
                <li>
                  <h2>Créer un compte</h2>
                </li>
              </NavLink>
            </ul>
          </nav>
        )}
        {hasUserLogged && (
          <NavLink className="sidemenu--link desktop-only" onClick={() => setMenu()} to="/profile">
            <>
              <img className="icon" src={userIcon} alt="profil" />
              <p>{userName}</p>
            </>
          </NavLink>
        )}
        <hr className="sidemenu--hr" />
        {hasUserLogged && (
          <>
            <nav className="sidemenu--navlist">
              <ul>
                <NavLink activeClassName="active-link" onClick={() => setMenu()} to="/home">
                  <li>
                    <img className="sidemenu--icon icon" src={homeIcon} alt="home" />
                    <h2>Accueil</h2>
                  </li>
                </NavLink>
                <NavLink activeClassName="active-link" onClick={() => setMenu()} to="/menu">
                  <li>
                    <img className="sidemenu--icon icon" src={calendarIcon} alt="menu" />
                    <h2>Menu</h2>
                  </li>
                </NavLink>
                <NavLink activeClassName="active-link" onClick={() => setMenu()} to="/myrecipes">
                  <li>
                    <img className="sidemenu--icon icon" src={recipesIcon} alt="recipes" />
                    <h2>Mes recettes</h2>
                  </li>
                </NavLink>
                <NavLink activeClassName="active-link" onClick={() => setMenu()} to="/inventory">
                  <li>
                    <img className="sidemenu--icon icon" src={inventoryIcon} alt="inventory" />
                    <h2>Inventaire</h2>
                  </li>
                </NavLink>
                <NavLink activeClassName="active-link" onClick={() => setMenu()} to="/shoplist">
                  <li>
                    <img className="sidemenu--icon icon" src={shoplistIcon} alt="shopping list" />
                    <h2>Liste de courses</h2>
                  </li>
                </NavLink>
              </ul>
            </nav>
            <hr className="sidemenu--hr" />
          </>
        )}
        {!hasUserLogged && (
          <nav className="sidemenu--navlist mobile-only">
            <ul>
              <NavLink onClick={() => setMenu()} to="/login">
                <li>
                  <h2>Se connecter</h2>
                </li>
              </NavLink>
              <NavLink onClick={() => setMenu()} to="/register">
                <li>
                  <h2>Créer un compte</h2>
                </li>
              </NavLink>
            </ul>
          </nav>
        )}
        {hasUserLogged && (
          <NavLink className="sidemenu--link" onClick={() => handleDisconnect()} to="/home">
            <img className="icon" src={powerIcon} alt="déconnexion" />
            <p>Déconnexion</p>
          </NavLink>
        )}
        <h1 className="sidemenu--title mobile-only">BatchCooker</h1>
      </div>
    </div>
  )
}
