import React, { useState } from 'react'
import Div100vh from 'react-div-100vh'

import Header from './Header'
import Main from './Main'
import Menu from './Menu'
import '../sass/layout/_Layout.scss'

export default function Layout() {
  const [isSideMenuActive, setMenu] = useState(false)

  const toggleFunction = setHook => setHook(prevState => !prevState)

  return (
    <Div100vh>
      <div className="global-layout">
        <Header toggleFunction={toggleFunction} setMenu={setMenu} />
        <Menu
          toggleFunction={toggleFunction}
          setMenu={setMenu}
          isSideMenuActive={isSideMenuActive}
        />
        <Main />
      </div>
    </Div100vh>
  )
}
