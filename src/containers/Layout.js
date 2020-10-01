import React, { useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Main from './Main'
import '../sass/layout/_Layout.scss'

export default function Layout() {
  const [isSearchBoxActive, setSearchBox] = useState(false)

  const toggleSearchBox = () => {
    setSearchBox(prevState => !prevState)
  }

  return (
    <div className="global-layout">
      <Header toggleSearchBox={toggleSearchBox} isSearchBoxActive={isSearchBoxActive} />
      <Main isSearchBoxActive={isSearchBoxActive} />
      <Navbar />
    </div>
  )
}
