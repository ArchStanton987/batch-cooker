import React, { useState } from 'react'

import '../sass/components/_LoginForm.scss'
import Modal from '../components/Modal'
import CTAButton from '../components/CTAButton'
import { postLogin } from '../lib/login'
import { Redirect } from 'react-router'

export default function LoginForm(props) {
  let { setIsLogged } = props

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
      if (result) {
        setIsLogged(true)
      }
    } catch (err) {
      setIsError(true)
      setErrorMessage(err.response.data.error)
    }
  }
  return (
    <>
      <Modal handleClose={() => {
        return <Redirect to='/'/>
        }} title={'Connexion'} parent={'login'}>
        <div className="login-box">
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
      </Modal>
    </>
  )
}
