import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Menu from '../pages/Menu'
import FullRecipe from '../pages/FullRecipe'
import NewRecipe from '../pages/NewRecipe'
import MyRecipes from '../pages/MyRecipes'
import Inventory from '../pages/Inventory'
import Shoplist from '../pages/Shoplist'
import PrivateRoute from '../pages/PrivateRoute'
import LoginForm from '../pages/Login'
import '../sass/layout/_Main.scss'

export default function Main() {
  return (
    <main className="main-layout">
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/home" render={() => <Home />} />
        <Route path="/recipes/:id" render={props => <FullRecipe {...props} />} />
        <Route path="/login" render={() => <LoginForm />} />
        <PrivateRoute path="/recipes/new">
          <NewRecipe />
        </PrivateRoute>
        <PrivateRoute path="/inventory">
          <Inventory />
        </PrivateRoute>
        <PrivateRoute path="/myrecipes">
          <MyRecipes />
        </PrivateRoute>
        <PrivateRoute path="/shoplist">
          <Shoplist />
        </PrivateRoute>
        <PrivateRoute path="/menu">
          <Menu />
        </PrivateRoute>
      </Switch>
    </main>
  )
}
