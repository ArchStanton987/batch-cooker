import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Menu from '../pages/Menu'
import FullRecipe from '../pages/FullRecipe'
import NewRecipe from '../pages/NewRecipe'
import MyRecipes from '../pages/MyRecipes'
import Inventory from '../pages/Inventory'
import Shoplist from '../pages/Shoplist'
import PrivateRoute from './PrivateRoute'
import Login from '../pages/Login'
import Register from '../pages/Register'
import '../sass/layout/_Main.scss'
import Profile from '../pages/Profile'

export default function Main({ ...props }) {
  const { setHasUserLogged, setUserId, userId, hasUserLogged, setUserName } = props

  return (
    <main className="main-layout">
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/home" render={() => <Home />} />
        <Route path="/recipes/:id" render={props => <FullRecipe {...props} />} />
        <Route
          path="/login"
          render={() => (
            <Login
              setHasUserLogged={setHasUserLogged}
              setUserId={setUserId}
              setUserName={setUserName}
            />
          )}
        />
        <Route path="/register" render={() => <Register />} />

        <PrivateRoute hasUserLogged={hasUserLogged} path="/recipes/new">
          <NewRecipe />
        </PrivateRoute>
        <PrivateRoute hasUserLogged={hasUserLogged} path="/inventory">
          <Inventory userId={userId} />
        </PrivateRoute>
        <PrivateRoute hasUserLogged={hasUserLogged} path="/myrecipes">
          <MyRecipes userId={userId} />
        </PrivateRoute>
        <PrivateRoute hasUserLogged={hasUserLogged} path="/shoplist">
          <Shoplist />
        </PrivateRoute>
        <PrivateRoute hasUserLogged={hasUserLogged} path="/menu">
          <Menu />
        </PrivateRoute>
        <PrivateRoute hasUserLogged={hasUserLogged} path="/profile">
          <Profile />
        </PrivateRoute>
      </Switch>
    </main>
  )
}
