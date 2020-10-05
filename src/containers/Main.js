import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../components/Home'
import Calendar from '../components/Calendar'
import Recipies from '../components/Recipies'
import Inventory from '../components/Inventory'
import Shoplist from '../components/Shoplist'
import '../sass/layout/_Main.scss'

export default function Main() {
  return (
    <main className="main-layout">
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/inventory" render={() => <Inventory />} />
        <Route path="/recipies" render={() => <Recipies />} />
        <Route path="/shoplist" render={() => <Shoplist />} />
        <Route path="/calendar" render={() => <Calendar />} />
      </Switch>
    </main>
  )
}
