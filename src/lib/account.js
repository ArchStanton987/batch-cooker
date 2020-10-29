import axios from 'axios'
import validator from 'validator'

export const postLogin = async credentials => {
  const url = `http://192.168.1.27:8000/api/account/login`
  const res = await axios.post(url, credentials, { withCredentials: true })
  return res
}

export const postRegister = async credentials => {
  const url = `http://192.168.1.27:8000/api/account/register`
  const res = await axios.post(url, credentials, { withCredentials: true })
  return res
}

const emailValidation = email => (validator.isEmail(email) ? null : 'Email invalide')
const usernameValidation = username => {
  return validator.isLength(username, { min: 4, max: 20 })
    ? null
    : 'Doit avoir entre 4 et 20 caractères'
}
const passwordValidation = password => {
  return validator.isLength(password, { min: 6, max: 30 })
    ? null
    : 'Doit avoir entre 6 et 30 caractères'
}
const confirmationValidation = confirmation => {
  const password = document.getElementById('register-form-password')
  return validator.equals(confirmation, password.value) ? null : 'Champ différent du mot de passe'
}

export const validate = {
  email: emailValidation,
  username: usernameValidation,
  password: passwordValidation,
  confirmation: confirmationValidation
}
