import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import MenuPage from '../pages/MenuPage'
import FullRecipePage from '../pages/FullRecipePage'
import NewRecipePage from '../pages/NewRecipePage'
import EditRecipePage from '../pages/EditRecipePage'
import MyRecipesPage from '../pages/MyRecipesPage'
import InventoryPage from '../pages/InventoryPage'
import ShoppinglistPage from '../pages/ShoppinglistPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import InformationsPages from '../pages/InformationsPage'
import PrivateRoute from '../components/wrappers/PrivateRoute'
import '../sass/layout/_Main.scss'

export default function Main({ ...props }) {
  const { hasUserLogged, setHasUserLogged, setUserId, UserId, setUserName } = props

  return (
    <main className="main-layout">
      <Switch>
        <Route
          exact
          path="/"
          render={() => <HomePage hasUserLogged={hasUserLogged} UserId={UserId} />}
        />
        <Route
          path="/home"
          render={() => <HomePage hasUserLogged={hasUserLogged} UserId={UserId} />}
        />
        <Route
          path="/informations"
          render={() => <InformationsPages hasUserLogged={hasUserLogged} UserId={UserId} />}
        />
        <Route
          path="/recipes/:id"
          render={props => (
            <FullRecipePage hasUserLogged={hasUserLogged} UserId={UserId} {...props} />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <LoginPage
              setHasUserLogged={setHasUserLogged}
              setUserId={setUserId}
              setUserName={setUserName}
              {...props}
            />
          )}
        />
        <Route path="/register" render={() => <RegisterPage />} />

        <PrivateRoute path="/myrecipes/new" hasUserLogged={hasUserLogged}>
          <NewRecipePage UserId={UserId} />
        </PrivateRoute>
        <PrivateRoute path="/myrecipes/edit/:id" hasUserLogged={hasUserLogged}>
          <EditRecipePage UserId={UserId} />
        </PrivateRoute>
        <PrivateRoute path="/myrecipes" hasUserLogged={hasUserLogged}>
          <MyRecipesPage UserId={UserId} />
        </PrivateRoute>
        <PrivateRoute path="/inventory" hasUserLogged={hasUserLogged}>
          <InventoryPage UserId={UserId} />
        </PrivateRoute>
        <PrivateRoute path="/shoplist" hasUserLogged={hasUserLogged}>
          <ShoppinglistPage UserId={UserId} />
        </PrivateRoute>
        <PrivateRoute path="/menu" hasUserLogged={hasUserLogged}>
          <MenuPage UserId={UserId} />
        </PrivateRoute>
        <PrivateRoute path="/profile" hasUserLogged={hasUserLogged}>
          <ProfilePage UserId={UserId} />
        </PrivateRoute>
      </Switch>
    </main>
  )
}
