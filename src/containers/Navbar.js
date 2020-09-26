import React from 'react'
import { Link } from 'react-router-dom'

import recipiesIcon from '../assets/img/recipiesIcon.png'
import calendarIcon from '../assets/img/calendarIcon.png'
import inventoryIcon from '../assets/img/shelf.png'
import shoplistIcon from '../assets/img/shop-listIcon.png'
import '../sass/layout/_Navbar.scss'

export default function Navbar({ handleChangeTab }) {
  return (
    <nav className="navbar mobile-only">
      <Link to="/calendar">
        <img
          onClick={handleChangeTab}
          name="calendar"
          className="navIcon"
          src={calendarIcon}
          alt="calendar"
        />
      </Link>

      <Link to="/recipies">
        <img
          onClick={handleChangeTab}
          name="recipies"
          className="navIcon"
          src={recipiesIcon}
          alt="recipies"
        />
      </Link>

      <Link to="/inventory">
        <img
          onClick={handleChangeTab}
          name="inventory"
          className="navIcon"
          src={inventoryIcon}
          alt="inventory"
        />
      </Link>

      <Link to="/shoplist">
        <img
          onClick={handleChangeTab}
          name="shoplist"
          className="navIcon"
          src={shoplistIcon}
          alt="shopping-list"
        />
      </Link>
    </nav>
  )
}
