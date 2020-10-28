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
