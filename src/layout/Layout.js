import React, { useState } from 'react'
import Div100vh from 'react-div-100vh'

import Header from './Header'
import Main from './Main'
import Sidemenu from './Sidemenu'
import '../sass/layout/_Layout.scss'
import { useToggle } from '../lib/hooks'
import { disconnectUser } from '../lib/api/api-account'

export default function Layout() {
  const [isSideMenuActive, setMenu] = useToggle(false)
  const [UserId, setUserId] = useState(parseInt(sessionStorage.getItem('UserId'), 10) || null)
  const [userName, setUserName] = useState('')
  const [hasUserLogged, setHasUserLogged] = useState(false)

  const storageId = sessionStorage.getItem('UserId')
  const storageUsername = sessionStorage.getItem('username')
  if (!hasUserLogged && storageId !== null) {
    setHasUserLogged(true)
    setUserName(storageUsername)
  }

  const handleDisconnect = async () => {
    await disconnectUser(UserId)
    sessionStorage.removeItem('UserId')
    sessionStorage.removeItem('username')
    window.location.reload()
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
          userName={userName}
          isSideMenuActive={isSideMenuActive}
          setMenu={setMenu}
          handleDisconnect={handleDisconnect}
          hasUserLogged={hasUserLogged}
        />
        <Main
          userName={userName}
          UserId={UserId}
          setUserId={setUserId}
          hasUserLogged={hasUserLogged}
          setHasUserLogged={setHasUserLogged}
          setUserName={setUserName}
        />
      </div>
    </Div100vh>
  )
}
