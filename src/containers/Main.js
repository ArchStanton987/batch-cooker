import React from 'react'
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
  return (
    <main className="main-layout">
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/home" render={() => <Home />} />
        <Route path="/inventory" render={() => <Inventory />} />
        <Route path="/recipes/new" render={props => <NewRecipe {...props} />} />
        <Route path="/recipes/:id" render={props => <FullRecipe {...props} />} />
        <Route path="/recipes" render={() => <Recipes />} />
        <Route path="/shoplist" render={() => <Shoplist />} />
        <Route path="/menu" render={() => <Menu />} />
      </Switch>
    </main>
  )
}
