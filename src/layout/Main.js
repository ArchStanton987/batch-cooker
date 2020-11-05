import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import MenuPage from '../pages/MenuPage'
import FullRecipePage from '../pages/FullRecipePage'
import NewRecipePage from '../pages/NewRecipePage'
import EditRecipePage from '../pages/EditRecipePage'
import MyRecipesPage from '../pages/MyRecipesPage'
import InventoryPage from '../pages/InventoryPage'
import ShoplistPage from '../pages/ShoplistPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import PrivateRoute from '../components/hoc/PrivateRoute'
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

        <PrivateRoute path="/myrecipes/new" hasUserLogged={hasUserLogged}>
          <NewRecipePage userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/myrecipes/edit/:id" hasUserLogged={hasUserLogged}>
          <EditRecipePage userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/myrecipes" hasUserLogged={hasUserLogged}>
          <MyRecipesPage userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/inventory" hasUserLogged={hasUserLogged}>
          <InventoryPage userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/shoplist" hasUserLogged={hasUserLogged}>
          <ShoplistPage userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/menu" hasUserLogged={hasUserLogged}>
          <MenuPage userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/profile" hasUserLogged={hasUserLogged}>
          <ProfilePage userId={userId} />
        </PrivateRoute>
      </Switch>
    </main>
  )
}
