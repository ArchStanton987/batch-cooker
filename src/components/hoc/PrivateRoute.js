import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ children, ...rest }) {
  const { hasUserLogged } = rest

  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasUserLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}
