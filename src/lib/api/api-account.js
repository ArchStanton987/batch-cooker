import axios from 'axios'
import { apiUrl } from '../utils/url-utils'

export const postLogin = async credentials => {
  const url = `${apiUrl}account/login`
  const res = await axios.post(url, credentials, { withCredentials: true })
  return res
}

export const postRegister = async credentials => {
  const url = `${apiUrl}account/register`
  const res = await axios.post(url, credentials, { withCredentials: true })
  return res
}

export const disconnectUser = async UserId => {
  const url = `${apiUrl}account/logout`
  const res = await axios.post(url, { UserId: UserId, disconnect: true }, { withCredentials: true })
  return res
}
