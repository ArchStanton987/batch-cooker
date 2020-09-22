import React from 'react'
import './Main.css'
import { Switch, Route } from 'react-router-dom'
import Home from '../../components/Home/Home'
import Calendar from '../../components/Calendar/Calendar'
import Recipies from '../../components/Recipies/Recipies'
import Inventory from '../../components/Inventory/Inventory'
import Shoplist from '../../components/Shoplist/Shoplist'

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
