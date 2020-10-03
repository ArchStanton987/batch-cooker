import React, { useState } from 'react'
import Header from './Header'
import Main from './Main'
import Menu from './Menu'
import '../sass/layout/_Layout.scss'

export default function Layout() {
  const [isSearchBoxActive, setSearchBox] = useState(false)
  const [isSideMenuActive, setMenu] = useState(false)

  const toggleFunction = setHook => setHook(prevState => !prevState)

  return (
    <div className="global-layout">
      <Header toggleFunction={toggleFunction} setMenu={setMenu} setSearchBox={setSearchBox} />
      <Menu toggleFunction={toggleFunction} setMenu={setMenu} isSideMenuActive={isSideMenuActive} />
      <Main isSearchBoxActive={isSearchBoxActive} />
    </div>
  )
}
