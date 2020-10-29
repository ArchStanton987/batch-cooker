import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import MenuPage from '../pages/MenuPage'
import FullRecipePage from '../pages/FullRecipePage'
import NewRecipePage from '../pages/NewRecipePage'
import MyRecipesPage from '../pages/MyRecipesPage'
import InventoryPage from '../pages/InventoryPage'
import ShoplistPage from '../pages/ShoplistPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import PrivateRoute from './PrivateRoute'
import '../sass/layout/_Main.scss'

export default function Main({ ...props }) {
  const { setHasUserLogged, setUserId, userId, hasUserLogged, setUserName } = props

  return (
    <main className="main-layout">
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route path="/home" render={() => <HomePage />} />
        <Route path="/recipes/:id" render={props => <FullRecipePage {...props} />} />
        <Route
          path="/login"
          render={() => (
            <LoginPage
              setHasUserLogged={setHasUserLogged}
              setUserId={setUserId}
              setUserName={setUserName}
            />
          )}
        />
        <Route path="/register" render={() => <RegisterPage />} />

        <PrivateRoute hasUserLogged={hasUserLogged} path="/recipes/new">
          <NewRecipePage />
        </PrivateRoute>
        <PrivateRoute hasUserLogged={hasUserLogged} path="/inventory">
          <InventoryPage userId={userId} />
        </PrivateRoute>
        <PrivateRoute hasUserLogged={hasUserLogged} path="/myrecipes">
          <MyRecipesPage userId={userId} />
        </PrivateRoute>
        <PrivateRoute hasUserLogged={hasUserLogged} path="/shoplist">
          <ShoplistPage />
        </PrivateRoute>
        <PrivateRoute hasUserLogged={hasUserLogged} path="/menu">
          <MenuPage />
        </PrivateRoute>
        <PrivateRoute hasUserLogged={hasUserLogged} path="/profile">
          <ProfilePage />
        </PrivateRoute>
      </Switch>
    </main>
  )
}
