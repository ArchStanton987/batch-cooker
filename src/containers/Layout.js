import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Main from './Main'
import '../sass/layout/_Layout.scss'

export default function Layout() {
  return (
    <div className="global-layout">
      <Header />
      <Main />
      <Navbar />
    </div>
  )
}
