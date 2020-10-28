import React, { useState } from 'react'
import validator from 'validator'

import '../sass/pages/_Login&Register.scss'
import CTAButton from '../components/CTAButton'
import { postRegister } from '../lib/account'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'

export default function Register(props) {
  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: '/login' } }

  const defaultValues = {
    email: '',
    password: '',
    username: '',
    passwordConfirmation: ''
  }

  const [credentials, setCredentials] = useState(defaultValues)
  const [isConfirmationActive, setConfirmation] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isConfirmationValid, setIsConfirmationValid] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleCredentialChange = e => {
    setCredentials({ ...credentials, [e.currentTarget.name]: e.currentTarget.value })
  }

  const checkEmailValidity = email => {
    const isValid = validator.isEmail(email)
    isValid ? setIsEmailValid(true) : setIsEmailValid(false)
  }
  const checkUsernameValidity = username => {
    const isValid = validator.isLength(username, { min: 5, max: 20 })
    isValid ? setIsUsernameValid(true) : setIsUsernameValid(false)
  }
  const checkPasswordValidity = password => {
    const isValid = validator.isLength(password, { min: 6, max: 30 })
    isValid ? setIsPasswordValid(true) : setIsPasswordValid(false)
  }
  const checkConfirmationValidity = (password, passwordConfirmation) => {
    const isValid = validator.equals(password, passwordConfirmation)
    isValid ? setIsConfirmationValid(true) : setIsConfirmationValid(false)
  }

  const handleRegisterSubmit = async e => {
    e.preventDefault()
    setIsError(false)
    checkEmailValidity(credentials.email)
    checkUsernameValidity(credentials.username)
    checkPasswordValidity(credentials.password)
    checkConfirmationValidity(credentials.password, credentials.passwordConfirmation)
    if (!isEmailValid || !isUsernameValid || !isPasswordValid || !isConfirmationValid) {
      return
    }
    try {
      await postRegister(credentials)
      setConfirmation(true)
      setInterval(() => {
        return history.replace(from)
      }, 6000)
    } catch (err) {
      setIsError(true)
      setErrorMessage(err.response.data.error)
      console.log(err)
    }
  }

  return (
    <>
      {isConfirmationActive && (
        <Modal
          handleClose={() => {
            setConfirmation(false)
            return history.replace(from)
          }}
          title={'Message'}
          parent={'register'}
        >
          Votre compte a bien été créé, vous allez être redirigé vers la page de connexion.
          <CTAButton
            onClick={() => {
              setConfirmation(false)
              return history.replace(from)
            }}
          >
            OK
          </CTAButton>
        </Modal>
      )}
      <div className="full-page-container">
        <div className="full-page-columnlayout">
          <h1 className="full-page--title">BatchCooker</h1>
          <div className="box">
            <h4>Création de votre compte</h4>
            <form className="flexColumn" onSubmit={handleRegisterSubmit} methode="post">
              <label htmlFor="email">
                <p>Email</p>
              </label>
              <input autoFocus={true} onChange={handleCredentialChange} name="email" type="text" />
              <p className={`error-message ${!isEmailValid && 'visible'}`}>
                Ce champ doit être de type email
              </p>
              <label htmlFor="username">
                <p>Nom d'utilisateur</p>
              </label>
              <input onChange={handleCredentialChange} name="username" type="text" />
              <p className={`error-message ${!isUsernameValid && 'visible'}`}>
                Le nom doit avoir entre 4 et 30 caractères
              </p>
              <label htmlFor="password">
                <p>Mot de passe</p>
              </label>
              <input onChange={handleCredentialChange} name="password" type="password" />
              <p className={`error-message ${!isPasswordValid && 'visible'}`}>
                Le mot de passe doit avoir entre 6 et 30 caractères
              </p>
              <label htmlFor="passwordConfirmation">
                <p>Confirmez le mot de passe</p>
              </label>
              <input
                onChange={handleCredentialChange}
                name="passwordConfirmation"
                type="password"
              />
              <p className={`error-message ${!isConfirmationValid && 'visible'}`}>
                Les deux mots de passe ne sont pas identiques
              </p>
              {isError && <p className={`error-message visible`}>{errorMessage}</p>}
              <CTAButton action={e => handleRegisterSubmit(e)} className={'authentication'}>
                Créer mon compte
              </CTAButton>
            </form>
          </div>
          <Link to="/login" className="authentication-link white">
            Vous avez déjà un compte ? Se connecter
          </Link>
        </div>
      </div>
    </>
  )
}
