import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../components/Home'
import Calendar from '../components/Calendar'
import FullRecipe from '../containers/FullRecipe'
import NewRecipe1 from '../components/NewRecipe1'
import Recipes from '../components/Recipes'
import Inventory from '../components/Inventory'
import Shoplist from '../components/Shoplist'
import '../sass/layout/_Main.scss'

export default function Main() {
  return (
    <main className="main-layout">
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/inventory" render={() => <Inventory />} />
        <Route path="/recipes/new/1" render={props => <NewRecipe1 {...props} />} />
        <Route path="/recipes/:id" render={props => <FullRecipe {...props} />} />
        <Route path="/recipes" render={() => <Recipes />} />
        <Route path="/shoplist" render={() => <Shoplist />} />
        <Route path="/calendar" render={() => <Calendar />} />
      </Switch>
    </main>
  )
}
