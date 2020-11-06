import React from 'react'
import { Redirect } from 'react-router-dom'

export default function PrivateRoute({ children, ...rest }) {
  const { hasUserLogged } = rest

  if (!hasUserLogged) {
    return <Redirect to="/login" />
  } else {
    return children
  }
}
