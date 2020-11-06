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
import PrivateRoute from '../components/wrappers/PrivateRoute'
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
      </Switch>
      <PrivateRoute hasUserLogged={hasUserLogged}>
        <Switch>
          <Route
            path="/myrecipes/new"
            render={props => <NewRecipePage userId={userId} {...props} />}
          />
          <Route
            path="/myrecipes/edit/:id"
            render={props => <EditRecipePage userId={userId} {...props} />}
          />
          <Route
            exact
            path="/myrecipes"
            render={props => <MyRecipesPage userId={userId} {...props} />}
          />
          <Route path="/inventory" render={props => <InventoryPage userId={userId} {...props} />} />
          <Route path="/shoplist" render={props => <ShoplistPage userId={userId} {...props} />} />
          <Route path="/menu" render={props => <MenuPage userId={userId} {...props} />} />
          <Route path="/profile" render={props => <ProfilePage userId={userId} {...props} />} />
        </Switch>
      </PrivateRoute>
    </main>
  )
}
