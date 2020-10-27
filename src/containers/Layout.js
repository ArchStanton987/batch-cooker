import React, { useState } from 'react'
import Div100vh from 'react-div-100vh'

import Header from './Header'
import Main from './Main'
import Sidemenu from './Sidemenu'
import '../sass/layout/_Layout.scss'
import { useToggle } from '../lib/hooks'

export default function Layout() {
  const [isSideMenuActive, setMenu] = useToggle(false)

  const [userId, setUserId] = useState(parseInt(sessionStorage.getItem('userId'), 10) || null)
  const [hasUserLogged, setHasUserLogged] = useState(false)

  const storage = sessionStorage.getItem('userId')
  if (!hasUserLogged && storage !== null) {
    setHasUserLogged(true)
  }

  const handleDisconnect = () => {
    sessionStorage.removeItem('userId')
    setHasUserLogged(false)
    if (isSideMenuActive) {
      return setMenu()
    }
  }

  return (
    <Div100vh>
      <div className="global-layout">
        <Header setMenu={setMenu} />
        <Sidemenu
          isSideMenuActive={isSideMenuActive}
          setMenu={setMenu}
          handleDisconnect={handleDisconnect}
          hasUserLogged={hasUserLogged}
        />
        <Main
          userId={userId}
          setUserId={setUserId}
          hasUserLogged={hasUserLogged}
          setHasUserLogged={setHasUserLogged}
        />
      </div>
    </Div100vh>
  )
}
