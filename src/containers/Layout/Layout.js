import React from 'react'
import Header from '../Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Main from '../Main/Main'
import './Layout.css'

export default function Layout() {
  return (
    <div className="global-layout">
      <Header />
      <Main />
      <Navbar />
    </div>
  )
}
