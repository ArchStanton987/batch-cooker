import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../sass/pages/_Login&Register.scss'
import CTAButton from '../components/CTAButton'
import Modal from '../components/Modal'
import SectionCTA from '../components/SectionCTA'
import Section from '../components/Section'
import Form from '../components/Form'
import { validate } from '../lib/account'

import { postRegister } from '../lib/account'

export default function Register() {
  const initialValues = {
    email: '',
    password: '',
    username: '',
    confirmation: ''
  }

  const [credentials, setCredentials] = useState(initialValues)
  const [isConfirmationActive, setConfirmation] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [responseError, setResponseError] = useState(false)
  const [responseErrorMessage, setResponseErrorMessage] = useState('')

  const handleCredentialChange = e => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
    setTouched({ ...touched, [name]: true })
  }

  const handleBlur = e => {
    const { name, value } = e.target
    const { [name]: removedError, ...rest } = errors
    const error = validate[name](value)
    setErrors({ ...rest, ...(error && { [name]: touched[name] && error }) })
  }

  const handleRegisterSubmit = async e => {
    e.preventDefault()
    const formValidation = Object.keys(credentials).reduce(
      (acc, key) => {
        const newError = validate[key](credentials[key])
        const newTouched = { [key]: true }
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError })
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        }
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    )
    setErrors(formValidation.errors)
    setTouched(formValidation.touched)
    if (
      !Object.values(formValidation.errors).length &&
      Object.values(formValidation.touched).length === Object.values(credentials).length &&
      Object.values(formValidation.touched).every(t => t === true)
    ) {
      try {
        await postRegister(credentials)
        setConfirmation(true)
      } catch (err) {
        setResponseError(true)
        if (err.response) {
          setResponseErrorMessage(err.response.data.error)
          return
        }
        if (err.request) {
          setResponseErrorMessage('Erreur dans la requête')
          return
        }
        setResponseErrorMessage(err.message)
      }
    }
  }

  return (
    <>
      {isConfirmationActive && (
        <Modal title={'Compte créé'} parent={'register'}>
          <Section className="no-border">
            Votre compte a bien été créé, Vous pouvez à présent vous connecter sur la page de
            connexion.
          </Section>
          <SectionCTA className="no-border">
            <Link to="/home">
              <CTAButton className="secondary" action={() => setConfirmation(false)}>
                Retour à l'accueil
              </CTAButton>
            </Link>
            <Link to="/login">
              <CTAButton action={() => setConfirmation(false)}>Connexion</CTAButton>
            </Link>
          </SectionCTA>
        </Modal>
      )}
      <div className="full-page-container">
        <div className="full-page-columnlayout">
          <h1 className="full-page--title">BatchCooker</h1>
          <div className="box">
            <h4>Création de votre compte</h4>
            <Form className={'flexColumn'} handleSubmit={handleRegisterSubmit} method={'post'}>
              <label htmlFor="register-form-email">
                <p>Email</p>
              </label>
              <input
                type="text"
                id="register-form-email"
                name="email"
                value={credentials.email}
                autoFocus={true}
                onChange={handleCredentialChange}
                onBlur={handleBlur}
                required
              />
              <p className={`error-message visible`}>{touched.email && errors.email}</p>
              <label htmlFor="register-form-username">
                <p>Nom d'utilisateur</p>
              </label>
              <input
                type="text"
                id="register-form-username"
                name="username"
                value={credentials.username}
                onChange={handleCredentialChange}
                onBlur={handleBlur}
                required
              />
              <p className={`error-message visible`}>{touched.username && errors.username}</p>
              <label htmlFor="register-form-password">
                <p>Mot de passe</p>
              </label>
              <input
                type="password"
                id="register-form-password"
                name="password"
                value={credentials.password}
                onChange={handleCredentialChange}
                onBlur={handleBlur}
                required
              />
              <p className={`error-message visible`}>{touched.password && errors.password}</p>
              <label htmlFor="register-form-confirmation">
                <p>Confirmez le mot de passe</p>
              </label>
              <input
                type="password"
                id="register-form-confirmation"
                name="confirmation"
                value={credentials.confirmation}
                onChange={handleCredentialChange}
                onBlur={handleBlur}
                required
              />
              <p className={`error-message visible`}>
                {touched.confirmation && errors.confirmation}
              </p>
              <p className={`error-message visible`}>{responseError && responseErrorMessage}</p>
              <CTAButton className={'authentication'}>Créer mon compte</CTAButton>
            </Form>
          </div>
          <Link to="/login" className="authentication-link white">
            Vous avez déjà un compte ? Se connecter
          </Link>
        </div>
      </div>
    </>
  )
}
