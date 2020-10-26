import React, { useState } from 'react'
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
import '../sass/layout/_Main.scss'

export default function Main() {
  const [userId, setUserId] = useState(null)
  const [isValidToken, setIsValidToken] = useState(true)

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
              isValidToken={isValidToken}
              setIsValidToken={setIsValidToken}
              setUserId={setUserId}
            />
          )}
        />
        {/* <PrivateRoute path="/recipes/new">
          <NewRecipe />
        </PrivateRoute> */}
        <PrivateRoute
          isValidToken={isValidToken}
          setIsValidToken={setIsValidToken}
          path="/inventory"
        >
          <Inventory
            isValidToken={isValidToken}
            setIsValidToken={setIsValidToken}
            userId={userId}
          />
        </PrivateRoute>
        {/* <PrivateRoute path="/myrecipes">
          <MyRecipes />
        </PrivateRoute>
        <PrivateRoute path="/shoplist">
          <Shoplist />
        </PrivateRoute>
        <PrivateRoute path="/menu">
          <Menu />
        </PrivateRoute> */}

        <Route path="/recipes/new/" render={props => <NewRecipe {...props} />} />
        <Route path="/myrecipes/" render={props => <MyRecipes {...props} />} />
        {/* <Route path="/inventory/" render={props => <Inventory {...props} />} /> */}
        <Route path="/menu/" render={props => <Menu {...props} />} />
        <Route path="/shoplist/" render={props => <Shoplist {...props} />} />
      </Switch>
    </main>
  )
}
