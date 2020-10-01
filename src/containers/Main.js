import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../components/Home'
import Calendar from '../components/Calendar'
import Recipies from '../components/Recipies'
import Inventory from '../components/Inventory'
import Shoplist from '../components/Shoplist'
import '../sass/layout/_Main.scss'

export default function Main({ isSearchBoxActive }) {
  return (
    <main className="main-layout">
      <Switch>
        <Route exact path="/" render={() => <Home isSearchBoxActive={isSearchBoxActive} />} />
        <Route
          path="/inventory"
          render={() => <Inventory isSearchBoxActive={isSearchBoxActive} />}
        />
        <Route path="/recipies" render={() => <Recipies isSearchBoxActive={isSearchBoxActive} />} />
        <Route path="/shoplist" render={() => <Shoplist isSearchBoxActive={isSearchBoxActive} />} />
        <Route path="/calendar" render={() => <Calendar isSearchBoxActive={isSearchBoxActive} />} />
      </Switch>
    </main>
  )
}
