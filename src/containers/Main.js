import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Menu from '../pages/Menu'
import FullRecipe from '../pages/FullRecipe'
import NewRecipe from '../pages/NewRecipe'
import Recipes from '../pages/Recipes'
import Inventory from '../pages/Inventory'
import Shoplist from '../pages/Shoplist'
import '../sass/layout/_Main.scss'

export default function Main() {
  const [isLogged, setIsLogged] = useState(false)
  const [token, setToken] = useState('')
  return (
    <main className="main-layout">
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home isLogged={isLogged} setIsLogged={setIsLogged} setToken={setToken} />}
        />
        <Route
          path="/home"
          render={() => <Home isLogged={isLogged} setIsLogged={setIsLogged} setToken={setToken} />}
        />
        <Route
          path="/inventory"
          render={() => (
            <Inventory isLogged={isLogged} setIsLogged={setIsLogged} setToken={setToken} />
          )}
        />
        <Route
          path="/recipes/new"
          render={props => (
            <NewRecipe
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              setToken={setToken}
              {...props}
            />
          )}
        />
        <Route
          path="/recipes/:id"
          render={props => (
            <FullRecipe
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              setToken={setToken}
              {...props}
            />
          )}
        />
        <Route
          path="/recipes"
          render={() => (
            <Recipes isLogged={isLogged} setIsLogged={setIsLogged} setToken={setToken} />
          )}
        />
        <Route
          path="/shoplist"
          render={() => (
            <Shoplist isLogged={isLogged} setIsLogged={setIsLogged} setToken={setToken} />
          )}
        />
        <Route
          path="/menu"
          render={() => <Menu isLogged={isLogged} setIsLogged={setIsLogged} setToken={setToken} />}
        />
      </Switch>
    </main>
  )
}
