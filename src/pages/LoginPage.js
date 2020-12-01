import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import '../sass/pages/_Login&Register.scss'
import CTAButton from '../components/page_layout/CTAButton'
import { postLogin } from '../lib/api/api-account'

export default function LoginPage(props) {
  let { setUserId, setHasUserLogged, setUserName } = props

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
      sessionStorage.setItem('UserId', result.data.UserId)
      sessionStorage.setItem('username', result.data.username)
      setUserId(result.data.UserId)
      setUserName(result.data.username)
      setHasUserLogged(true)
      return history.replace(from)
    } catch (err) {
      setIsError(true)
      if (err.response) {
        setErrorMessage(err.response.data.error)
        return
      }
      if (err.request) {
        setErrorMessage('Erreur dans la requête')
        return
      }
      setErrorMessage(err.message)
    }
  }

  return (
    <>
      <div className="full-page-container">
        <div className="full-page-columnlayout">
          <h1 className="full-page--title">
            <Link to="/home">BatchCooker</Link>
          </h1>
          <div className="box">
            <h4>Connexion à votre compte</h4>
            <form className="flexColumn" onSubmit={handleLoginSubmit} methode="post">
              <label htmlFor="email">
                <p>Email</p>
              </label>
              <input autoFocus={true} onChange={handleCredentialChange} name="email" type="text" />
              <label htmlFor="password">
                <p>Mot de passe</p>
              </label>
              <input onChange={handleCredentialChange} name="password" type="password" />
              <p className={`error-message ${isError && 'visible'}`}>{errorMessage}</p>
              <CTAButton action={e => handleLoginSubmit(e)} className={'authentication fancy-font'}>
                Se connecter
              </CTAButton>
            </form>
            <hr className="box--hr" />
            <Link className="authentication-link" to="/register">
              Nouveau sur BatchCooker ?
            </Link>
            <CTAButton className={'authentication secondary nolink'}>
              <Link to="/register">Je créée un compte</Link>
            </CTAButton>
          </div>
          <Link to="/home" className="authentication-link white">
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
    </>
  )
}
