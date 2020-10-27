import React, { useState } from 'react'

import '../sass/components/_LoginForm.scss'
import CTAButton from '../components/CTAButton'
import { postLogin } from '../lib/login'
import { useHistory, useLocation } from 'react-router'

export default function LoginForm(props) {
  let { setUserId, setHasUserLogged } = props

  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: '/' } }

  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleCredentialChange = e => {
    setCredentials({ ...credentials, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleLoginSubmit = async e => {
    e.preventDefault()
    setIsError(false)
    setErrorMessage('')
    try {
      const result = await postLogin(credentials)
      sessionStorage.setItem('userId', result.data.userId)
      setUserId(result.data.userId)
      setHasUserLogged(true)
      return history.replace(from)
    } catch (err) {
      setIsError(true)
      setErrorMessage(err.response.data.error)
    }
  }

  return (
    <>
      <div className="login-box">
        <p>You must log in to view the {from.pathname}</p>
        <form onSubmit={handleLoginSubmit} methode="post">
          <label htmlFor="email">
            <p>Email</p>
          </label>
          <input onChange={handleCredentialChange} name="email" type="text" />
          <label htmlFor="password">
            <p>Mot de passe</p>
          </label>
          <input onChange={handleCredentialChange} name="password" type="password" />
          {isError && <p className="error-message">{errorMessage}</p>}
          <CTAButton className={'authentication'}>Je créée un compte</CTAButton>
          <CTAButton action={e => handleLoginSubmit(e)} className={'authentication'}>
            Connexion
          </CTAButton>
        </form>
      </div>
    </>
  )
}
