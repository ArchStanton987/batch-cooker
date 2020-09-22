import React from 'react'
import { Link } from 'react-router-dom'
import homeIcon from '../../assets/img/home-icon.png'
import './Header.css'

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img id="homeIcon" src={homeIcon} alt="home" />
      </Link>
      <h1>BatchCooker</h1>
    </header>
  )
}
